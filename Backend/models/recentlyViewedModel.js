const mongoose = require('mongoose');

const recentlyViewedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    viewCount: {
      type: Number,
      default: 1,
    },
    lastViewed: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for fast lookup of a specific product for a specific user
recentlyViewedSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('RecentlyViewed', recentlyViewedSchema);
