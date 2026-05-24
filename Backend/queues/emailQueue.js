const { createQueue } = require('./queueManager');
const logger = require('../utils/logger');
const { isRedisAvailable } = require('../config/redis');
const sendEmail = require('../utils/sendEmail');

const emailQueue = createQueue('EmailQueue');

const enqueueEmail = async (jobName, data) => {
  try {
    const redisReady = await isRedisAvailable();
    if (!redisReady && process.env.NODE_ENV === 'development') {
        logger.warn(`[QUEUE FALLBACK] Redis unavailable. Sending email directly for ${data.email}`);
        await sendEmail(data);
        return { id: 'fallback_direct_send' };
    }

    const job = await emailQueue.add(jobName, data);
    logger.info(`[QUEUE] Enqueued Email Job: ${job.id} for ${data.email}`);
    return job;
  } catch (error) {
    logger.error(`[QUEUE ERROR] Failed to enqueue Email Job: ${error.message}`);
  }
};

module.exports = { emailQueue, enqueueEmail };