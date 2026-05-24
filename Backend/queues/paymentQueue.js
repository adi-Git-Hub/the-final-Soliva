const { createQueue } = require('./queueManager');
const logger = require('../utils/logger');

const paymentQueue = createQueue('PaymentQueue');

const enqueuePaymentRecovery = async (orderId, razorpayOrderId, delayMs = 30 * 60 * 1000) => {
  try {
    // Delay checking payment status (e.g. 30 mins)
    const job = await paymentQueue.add('recoverPayment', { orderId, razorpayOrderId }, { delay: delayMs });
    logger.info(`[QUEUE] Enqueued Payment Recovery Job: ${job.id} for Order: ${orderId} in ${delayMs / 1000}s`);
    return job;
  } catch (error) {
    logger.error(`[QUEUE ERROR] Failed to enqueue Payment Recovery Job: ${error.message}`);
  }
};

module.exports = { paymentQueue, enqueuePaymentRecovery };