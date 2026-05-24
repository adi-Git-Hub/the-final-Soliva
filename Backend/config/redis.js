const Redis = require('ioredis');
const logger = require('../utils/logger');

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
  lazyConnect: true, // Don't connect immediately
  retryStrategy(times) {
    if (process.env.NODE_ENV === 'development' && times > 1) {
      logger.warn('[REDIS] Redis not found. Background jobs will be disabled.');
      return null; // Stop retrying in dev
    }
    return Math.min(times * 50, 2000);
  }
};

const connection = new Redis(redisConfig);

connection.on('error', (err) => {
  if (err.code === 'ECONNREFUSED' && process.env.NODE_ENV === 'development') {
    // Suppress spammy refusal logs in dev
    return;
  }
  logger.error(`[REDIS ERROR] ${err.message}`);
});

connection.on('connect', () => {
  logger.info('[REDIS] Connected to Redis');
});

// Helper to check if redis is truly available
const isRedisAvailable = async () => {
  try {
    await connection.connect();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { connection, isRedisAvailable };