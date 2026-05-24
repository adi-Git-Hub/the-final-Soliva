const express = require('express');
const {
  newOrder,
  verifyPayment,
  getSingleOrder,
  myOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const orderValidator = require('../validators/orderValidator');

const router = express.Router();

router.use(isAuthenticatedUser);

router.post('/', validate(orderValidator.createOrder), newOrder);
router.post('/verify-payment', validate(orderValidator.verifyPayment), verifyPayment);
router.get('/me', myOrders);
router.get('/:id', validate(orderValidator.getOrderById), getSingleOrder);
router.put('/:id/cancel', validate(orderValidator.getOrderById), cancelOrder);

// Admin routes
router.get(
  '/admin/orders',
  authorizeRoles('admin'),
  getAllOrders
);

router.put(
  '/admin/orders/:id',
  authorizeRoles('admin'),
  validate(orderValidator.updateStatus),
  updateOrderStatus
);

module.exports = router;