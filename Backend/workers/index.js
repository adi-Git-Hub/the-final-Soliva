const emailWorker = require('./emailWorker');
const paymentWorker = require('./paymentWorker');
const inventoryWorker = require('./inventoryWorker');
const logger = require('../utils/logger');

logger.info('[WORKERS] Initialized Email, Payment, and Inventory Workers.');

module.exports = {
  emailWorker,
  paymentWorker,
  inventoryWorker,
};