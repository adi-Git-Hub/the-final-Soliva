const { Queue } = require('bullmq');
const { connection } = require('../config/redis');

const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 5000, // 5s, 10s, 20s
  },
  removeOnComplete: true,
  removeOnFail: false, // Keep failed jobs for manual inspection (Dead Letter)
};

const queues = [];

const createQueue = (name) => {
  const queue = new Queue(name, {
    connection,
    defaultJobOptions,
  });
  
  queues.push(queue);
  return queue;
};

module.exports = { createQueue, queues };