# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS production

WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy build output from build stage
COPY --from=build /app/dist ./dist

# Expose the port
EXPOSE 8080

# Run the application
CMD ["serve", "-s", "dist", "-l", "8080"]
