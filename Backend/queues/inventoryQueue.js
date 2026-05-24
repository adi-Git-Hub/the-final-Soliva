const { createQueue } = require('./queueManager');
const logger = require('../utils/logger');

const inventoryQueue = createQueue('InventoryQueue');

const enqueueInventoryRecovery = async (orderId, items, delayMs = 15 * 60 * 1000) => {
  try {
    // Delay restoring stock for pending orders (e.g. 15 mins)
    const job = await inventoryQueue.add('recoverStock', { orderId, items }, { delay: delayMs });
    logger.info(`[QUEUE] Enqueued Inventory Recovery Job: ${job.id} for Order: ${orderId} in ${delayMs / 1000}s`);
    return job;
  } catch (error) {
    logger.error(`[QUEUE ERROR] Failed to enqueue Inventory Recovery Job: ${error.message}`);
  }
};

module.exports = { inventoryQueue, enqueueInventoryRecovery };