const mongoose = require('mongoose');
const redisConnection = require('../config/redis');
const { queues } = require('../queues/queueManager');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendResponse = require('../utils/sendResponse');
const os = require('os');

/**
 * @desc    System Health Check
 * @route   GET /api/v1/system/health
 * @access  Public (or Admin protected depending on requirements)
 */
exports.getSystemHealth = catchAsyncErrors(async (req, res, next) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    memory: process.memoryUsage(),
    os: {
      loadavg: os.loadavg(),
      freeMem: os.freemem(),
      totalMem: os.totalmem(),
    },
    services: {
      mongodb: mongoose.connection.readyState === 1 ? 'up' : 'down',
      redis: redisConnection.status === 'ready' ? 'up' : 'down',
    },
    queues: {},
  };

  // Get job counts for all queues
  for (const queue of queues) {
    const counts = await queue.getJobCounts('wait', 'completed', 'failed', 'delayed', 'active');
    health.queues[queue.name] = counts;
  }

  // Determine overall status
  if (health.services.mongodb !== 'up' || health.services.redis !== 'up') {
    health.status = 'DEGRADED';
  }

  return sendResponse(res, {
    success: true,
    data: health,
  });
});