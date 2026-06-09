const UserProfile = require('../models/userProfileModel');

class UserProfileRepository {
  async findByUserId(userId) {
    return await UserProfile.findOne({ user: userId }).populate('wishlist.product');
  }

  async create(profileData) {
    return await UserProfile.create(profileData);
  }

  async update(userId, updateData) {
    return await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async addToWishlist(userId, productData) {
    return await UserProfile.findOneAndUpdate(
      { user: userId },
      { $addToSet: { wishlist: productData } },
      { new: true }
    );
  }

  async removeFromWishlist(userId, productId) {
    return await UserProfile.findOneAndUpdate(
      { user: userId },
      { $pull: { wishlist: { product: productId } } },
      { new: true }
    );
  }

  async updateNotificationPreferences(userId, notifications) {
    return await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: { notifications } },
      { new: true }
    );
  }
}

module.exports = new UserProfileRepository();
