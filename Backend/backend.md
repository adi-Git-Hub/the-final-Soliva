# Soliva Backend Documentation

This document provides a comprehensive technical overview of the Soliva backend system. It covers the architecture, internal workflows, security layers, and module-specific logic.

## 1. Backend Overview

The Soliva backend is a robust RESTful API built on the Node.js ecosystem. It handles the core business logic, data persistence, authentication, and third-party integrations for the Soliva e-commerce platform.

### Main Responsibilities:
- **Identity Management:** Secure user registration, OTP-based verification, and multi-device session management.
- **Product & Inventory:** Managing catalog items, stock levels, and category-based filtering.
- **Transactional Flow:** Cart management, order processing, and payment gateway integration.
- **Communication:** Automated email services for OTPs and order updates.
- **Asset Management:** Secure file uploads for product images.
- **Background Processing:** Scalable async queues for emails, payment recovery, and inventory locking.

### Request Processing System:
All incoming requests pass through a multi-layered pipeline:
1.  **Tracing Layer:** Assigns a unique `X-Request-Id` (RID) for end-to-end observability.
2.  **Security Layer:** Headers validation, sanitization, and rate limiting.
3.  **Validation Layer:** Request body, params, and query validation via **Zod**.
4.  **Routing Layer:** Directing requests to specific module handlers.
5.  **Middleware Layer:** Authentication, role authorization, and data parsing.
6.  **Controller Layer:** Orchestrating business logic using standardized response utility.
7.  **Service/Database Layer:** Data retrieval, persistence, and **Queue Enqueueing**.

---

## 2. Backend Folder Structure

```text
backend/
├── config/             # Database and environment configurations
├── controllers/        # Business logic for each resource
├── middleware/         # Custom request interceptors (Auth, Error, Multer, Validate)
├── models/             # Database schemas and models (MongoDB/Mongoose)
├── routes/             # API endpoint definitions
├── services/           # Fat layer for business logic
├── queues/             # BullMQ Queue definitions (Email, Payment, Inventory)
├── workers/            # Background job processors
├── utils/              # Helper functions (JWT, Email, sendResponse)
├── validators/         # Zod validation schemas
├── logs/               # Application logs (error, combined, exceptions)
├── uploads/            # Local storage for physical files/images
├── app.js              # Express application initialization
└── server.js           # Server entry point and DB connection
```

- **`controllers/`**: Contains functions that receive `req` and `res`, calling models or utils as needed.
- **`middleware/`**: Functions that run before controllers (e.g., checking if a user is logged in).
- **`models/`**: Defines the structure of data in the database.
- **`routes/`**: Maps URL paths to specific controller functions.
- **`services/`**: Core business logic and database interactions.
- **`queues/` & `workers/`**: Async task management using Redis and BullMQ.

---

## 3. Complete Backend Flow

The following diagram illustrates the lifecycle of a typical API request, now enhanced with transactional safety and async jobs:

```text
       Client Request (HTTP)
              |
              v
      +-------+-------+
      |  app.js (Core)| <--- Helmet, CORS, Rate Limiters
      +-------+-------+
              |
              v
      +-------+-------+
      |  Route Layer  | <--- e.g., /api/v1/orders
      +-------+-------+
              |
              v
      +-------+-------+
      |  Middleware   | <--- Auth, Admin Check, Zod Validation
      +-------+-------+
              |
              v
      +-------+-------+
      |  Controller   | <--- Receives Idempotency-Key
      +-------+-------+
              |
      +-------+-------+
      | Service Layer | <--- Start MongoDB Session & Transaction
      +-------+-------+
              |
              +--> Atomic Stock Decrement
              |
              +--> Create DB Order
              |
              +--> Clear Shopping Cart
              |
              v
      +-------+-------+
      | Commit / Abort| <--- Commit if all succeed, Abort on error
      +-------+-------+
              |
              +--> BullMQ: Enqueue Payment Recovery (30m delay)
              |
              +--> BullMQ: Enqueue Inventory Recovery (15m delay)
              |
              v
      +-------+-------+
      | JSON Response | <--- { success: true, data: [...] } (Immediate)
      +-------+-------+
```

---

## 4. Route System

Routes are organized by resource and versioned under `/api/v1/`.

- **`authRoutes`**: Handles `/register`, `/login`, `/verify-email`, `/forgot-password`.
- **`productRoutes`**: Public routes for fetching products and admin routes for managing them.
- **`cartRoutes`**: Manages user-specific shopping carts.
- **`orderRoutes`**: Handles order creation and Razorpay payment verification.
- **`paymentRoutes`**: Dedicated endpoint for async webhooks.
- **`uploadRoutes`**: Dedicated endpoint for administrative image uploads.

**API Organization Principle:**
Routes are decoupled from logic. The route file only defines the path and the chain of middleware/controllers.

---

## 5. Controller Flow

Controllers act as the "Brain" of the operation. They follow a strict pattern to ensure consistency.

```text
    Request
       |
       v
+--------------+
| Controller   |
+--------------+
       |
       +--> 1. Validate Input (Params/Body)
       |
       +--> 2. Interaction (Model/Database)
       |
       +--> 3. Logical Check (e.g., "Is stock available?")
       |
       +--> 4. Finalize (Send JSON Response)
```

**Response Management:**
Every controller uses `catchAsyncErrors` to eliminate `try/catch` boilerplate, forwarding any runtime errors to the centralized `errorMiddleware`.

---

## 6. Middleware System

Middleware functions are specialized functions that have access to the request and response objects.

### Core Middleware:
1.  **`authMiddleware.js`**:
    - `isAuthenticatedUser`: Extracts JWT from cookies/headers, verifies it, and attaches `req.user`.
    - `authorizeRoles`: Restricts access to specific roles (e.g., 'admin').
2.  **`errorMiddleware.js`**:
    - Catches all errors (404, 500, DB validation errors) and returns a formatted JSON response.
3.  **`multer.js`**:
    - Intercepts `multipart/form-data` for file uploads, validates file type, and saves to disk.
4.  **`validate.js`**:
    - Intercepts requests to validate schemas using Zod.

**Execution Order:**
`Request -> Security -> Auth -> Validation -> Controller`

---

## 7. Authentication System

The system uses a custom JWT implementation with session tracking for enhanced security. OTP delivery is handled **asynchronously** via BullMQ.

```text
      Login Request (Email/Pass)
                |
                v
      +---------+---------+
      | Verify Credentials| <--- Bcrypt Compare
      +---------+---------+
                |
                v
      +---------+---------+
      | Generate Session  | <--- ID, IP, Device, Timestamp
      +---------+---------+
                |
                v
      +---------+---------+
      | JWT Generation    | <--- Payload: { userId, sessionId }
      +---------+---------+
                |
                v
      +---------+---------+
      | HTTP-Only Cookie  | <--- Secure Token Storage
      +---------+---------+
```

### Key Security Features:
- **Password Hashing**: Salted hashing via `bcryptjs`.
- **OTP Verification**: 6-digit cryptographically secure OTPs for account verification and password resets.
- **Account Locking**: Automatically locks accounts for 15 minutes after 5 failed login attempts.
- **Session Tracking**: Users can see and manage active sessions across different devices.

---

## 8. Database Flow

The system uses **MongoDB** with **Mongoose** as the ODM (Object Data Modeling) library.

```text
   Controller
       |
       v
   +-------+
   | Model | <--- Schema Validation, Pre-save hooks
   +-------+
       |
       v
   +-------+
   | MongoDB| <--- Query Execution
   +-------+
       |
       v
   +-------+
   | Result| <--- Mongoose Document / Lean Object
   +-------+
```

- **Relationships**: Orders are linked to Users and Products via ObjectIDs (`ref`).
- **Optimization**: Uses indexing on `email`, `username`, and `phoneNumber`.

---

## 9. Product Management Flow

Products are managed by admins but viewed by all users.

- **Create**: Admin uploads image -> Gets URL -> Submits product details.
- **Fetch**: Public access with support for pagination and category filtering.
- **Update**: Atomic updates to specific fields (price, stock, description).
- **Stock Control**: Automated stock decrementing upon order verification (Atomic transactions).

---

## 10. Cart System Flow

The cart system is persisted in the database, allowing users to sync their shopping experience across devices.

1.  **Add**: Checks product existence and stock -> Updates/Creates Cart document.
2.  **Update**: Modifies quantity while validating against available stock.
3.  **Remove**: Deletes specific item from the `items` array in the Cart model.
4.  **Fetch**: Populates product details (name, price, image) for display.

---

## 11. Order Flow & Transaction Architecture

The order creation process uses strict **MongoDB Transactions** to ensure multi-document consistency. It enforces an **Idempotency System** to prevent duplicate order generation.

1.  **Placement**: Client passes `x-idempotency-key`. The transaction begins.
2.  **Idempotency Check**: If key exists, return the previously created order to prevent duplicates.
3.  **Inventory Locking**: Atomically decrements product stock (`$inc: { stock: -quantity }`). If insufficient, the transaction rolls back.
4.  **Order Generation**: Creates Razorpay intent and the `Order` document in the DB.
5.  **Cart Clearing**: Deletes user cart contents.
6.  **Commit**: If steps 1-5 succeed, the transaction commits. If any step fails, everything rolls back.

### Strict Order State Machine

Valid transitions prevent impossible state changes:
- `pending` -> `paid`, `cancelled`
- `paid` -> `confirmed`, `packed`, `cancelled`, `refunded`
- `confirmed` -> `packed`, `shipped`, `cancelled`, `refunded`
- `packed` -> `shipped`, `cancelled`, `refunded`
- `shipped` -> `delivered`, `cancelled`, `refunded`
- `delivered` -> `refunded`
- `cancelled` -> No further transitions. Stock is restored.
- `refunded` -> No further transitions.

---

## 12. Razorpay Payment & Queue Architecture Flow

Soliva uses Razorpay for secure transaction processing, combined with **BullMQ** for delayed consistency checks.

```text
      User Clicks 'Pay'
              |
              v
    +---------+---------+
    | Server: Create    |
    | Razorpay Order    | <--- Call Razorpay API
    +---------+---------+
              |
              v
    +---------+---------+
    | BullMQ: Enqueue   |
    | Recovery Jobs     | <--- 15m (Inventory) / 30m (Payment)
    +---------+---------+
              |
              v
    +---------+---------+
    | Server: Verify    |
    | Signature / Webhook| <--- HMAC SHA256 Check via API or Webhook
    +---------+---------+
              |
              v
    +---------+---------+
    | Update Order Stat | <--- Paid / Confirmed (Transactional)
    +---------+---------+
```

### Background Processing (BullMQ & Redis)
- **Email Queue**: Offloads OTPs and order confirmations to prevent API blocking. Supports automatic exponential backoff retries.
- **Inventory Queue**: Delays a stock recovery job for 15 minutes. If an order remains `pending` (abandoned cart), stock is restored automatically.
- **Payment Queue**: Delays a payment check for 30 minutes. Reconciles with Razorpay API in case webhooks or client-side verifications failed.
- **Dead Letter Strategy**: Failed jobs are kept in Redis for manual inspection and monitoring.

---

## 13. Observability & Monitoring Architecture

Soliva Backend is equipped with professional ops-ready monitoring tools.

### Request Tracing (RID)
Every incoming request is assigned a unique `X-Request-Id` (RID). This ID is propagated through:
- **HTTP Headers**: Returned to the client for support referencing.
- **Structured Logs**: Every log entry includes the RID, allowing end-to-end tracing of a single transaction.
- **Performance Metrics**: Request duration and status codes are logged automatically via `tracing.js` middleware.

### Bull Board Dashboard
A real-time dashboard is available at `/api/v1/admin/queues` (Admin Only).
- **Visualization**: Monitor all jobs in `EmailQueue`, `PaymentQueue`, and `InventoryQueue`.
- **Management**: Manually retry failed jobs, promote delayed jobs, or clean completed ones.
- **Status Tracking**: Live counts of Active, Waiting, Completed, Delayed, and Failed jobs.

### System Health Monitoring
The `GET /api/v1/system/health` endpoint provides a comprehensive status report:
- **Service Status**: Connectivity status for MongoDB and Redis.
- **Resources**: Real-time memory usage (RSS, Heap), Uptime, and OS load averages.
- **Queue Backlog**: Instant job counts for all BullMQ queues to detect processing delays.

---

## 14. Email Service Flow

Integrated via **Nodemailer** using SMTP and processed asynchronously via **BullMQ**.

- **Triggers**: Registration (OTP), Password Reset (OTP), Welcome Email.
- **Templates**: Centralized HTML templates in `utils/emailTemplates.js`.
- **Workflow**: Controller calls Service -> Service Enqueues Job -> `emailWorker.js` processes Job -> SMTP Transporter sends mail -> Success/Failure logged with RID.

---

## 15. Error Handling & Tracing Flow

The backend uses a centralized error-handling strategy combined with performance tracing.

```text
   Request RID: abc-123
              |
              v
    +---------+---------+
    | tracingMiddleware | <--- Starts timer, injects RID
    +---------+---------+
              |
              v
    +---------+---------+
    | Error?  (Catch)   |
    +---------+---------+
              |
              v
    +---------+---------+
    | logger.error()    | <--- Logs Message + RID + Stack Trace
    +---------+---------+
              |
              v
    +---------+---------+
    | JSON Error Format | <--- { success: false, rid: "abc-123", ... }
    +---------+---------+
```


---

## 15. File Upload Flow

Image management is handled via **Multer** and local storage.

1.  **Request**: `POST /api/v1/upload` with a file field.
2.  **Validation**: Multer checks if file is an image and < 2MB.
3.  **Storage**: File is renamed with a unique timestamp and saved to `uploads/`.
4.  **Response**: Returns the full public URL of the uploaded image.

---

## 16. API Response Structure

All API responses follow a consistent format via the `sendResponse` utility.

**Success Response:**
```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 17. Security Layer

The backend implements several security best practices:
- **Helmet**: Sets various HTTP headers to secure the app.
- **CORS**: Restricted to the specific frontend URL.
- **Rate Limiting**: Brute-force protection on login routes (20 requests/15 mins).
- **Sanitization**: `express-mongo-sanitize` prevents NoSQL injection.
- **XSS Protection**: `xss-clean` filters malicious user input.
- **HPP**: Protects against HTTP Parameter Pollution.

---

## 18. Backend Execution Lifecycle

1.  **Initialization**: `node server.js` loads `.env` variables.
2.  **Database**: `connectDB()` establishes a connection to MongoDB.
3.  **App Setup**: `app.js` configures middleware, security, and routes.
4.  **Workers**: BullMQ workers connect to Redis to process background jobs.
5.  **Server Start**: Express starts listening on the configured `PORT`.
6.  **Traffic**: Requests are handled concurrently by the Node.js event loop.
7.  **Termination**: Graceful shutdown handles unhandled promise rejections.

---

## 19. Future Backend Improvements

- **Redis Caching**: To speed up product catalog fetching.
- **Dockerization**: For consistent deployment environments.
- **Cloudinary Migration**: Transitioning from local storage to cloud asset management.
- **Monitoring Dashboards**: Integrating BullMQ dashboard for real-time queue visual monitoring.
