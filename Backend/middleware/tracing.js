const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

/**
 * Request Tracing Middleware
 * Adds unique Request ID and logs request performance metrics
 */
const tracing = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  const start = Date.now();

  // Log on request finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const statusCode = res.statusCode;
    const userId = req.user ? req.user.id : 'Guest';

    logger.http(
      `[TRACE] ${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip} - User: ${userId} - RID: ${requestId}`
    );
  });

  next();
};

module.exports = tracing;