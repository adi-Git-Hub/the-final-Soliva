const RecentlyViewed = require('../models/recentlyViewedModel');

class RecentlyViewedRepository {
  async findByUser(userId, limit = 10) {
    return await RecentlyViewed.find({ user: userId })
      .sort({ lastViewed: -1 })
      .limit(limit)
      .populate('product');
  }

  async upsert(userId, productId) {
    return await RecentlyViewed.findOneAndUpdate(
      { user: userId, product: productId },
      { 
        $inc: { viewCount: 1 },
        $set: { lastViewed: Date.now() }
      },
      { upsert: true, new: true }
    );
  }
}

module.exports = new RecentlyViewedRepository();
