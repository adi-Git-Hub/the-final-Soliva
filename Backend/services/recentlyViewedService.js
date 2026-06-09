const recentlyViewedRepository = require('../repositories/recentlyViewedRepository');

// Simple in-memory cache for debouncing updates
const updateCache = new Map();
const DEBOUNCE_TIME = 60 * 1000; // 1 minute

class RecentlyViewedService {
  async getRecentProducts(userId) {
    return await recentlyViewedRepository.findByUser(userId);
  }

  async trackProductView(userId, productId) {
    const cacheKey = `${userId}:${productId}`;
    const lastUpdate = updateCache.get(cacheKey);
    const now = Date.now();

    if (!lastUpdate || now - lastUpdate > DEBOUNCE_TIME) {
      updateCache.set(cacheKey, now);
      return await recentlyViewedRepository.upsert(userId, productId);
    }

    // Return current stats without updating DB to prevent spam
    return { userId, productId, status: 'debounced' };
  }
}

module.exports = new RecentlyViewedService();
