const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    lifestyle: {
      type: String,
      enum: ['student', 'office commute', 'outdoor usage', 'travel usage', 'daily rides', 'other'],
      default: 'other',
    },
    preferences: {
      preferredColors: [String],
      utilityMode: {
        type: String,
        enum: ['office commute', 'outdoor travel', 'daily rides'],
      },
    },
    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        wantsRestockAlert: {
          type: Boolean,
          default: false,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notifications: {
      email: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
