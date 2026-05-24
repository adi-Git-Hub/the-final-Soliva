const { Worker } = require('bullmq');
const { connection } = require('../config/redis');
const sendEmail = require('../utils/sendEmail');
const logger = require('../utils/logger');

const emailWorker = new Worker('EmailQueue', async (job) => {
  logger.info(`[WORKER] Processing Email Job: ${job.id} - Type: ${job.name}`);
  const { email, subject, html } = job.data;
  
  await sendEmail({ email, subject, html });
  
  logger.info(`[WORKER] Completed Email Job: ${job.id} for ${email}`);
}, { 
  connection,
  concurrency: 5 // Process 5 emails concurrently
});

emailWorker.on('failed', (job, err) => {
  logger.error(`[WORKER ERROR] Email Job ${job.id} failed: ${err.message}`);
});

module.exports = emailWorker;