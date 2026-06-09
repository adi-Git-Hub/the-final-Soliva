const userProfileRepository = require('../repositories/userProfileRepository');
const ErrorHandler = require('../utils/errorHandler');

class UserProfileService {
  async getProfile(userId) {
    let profile = await userProfileRepository.findByUserId(userId);
    if (!profile) {
      // Create a default profile if it doesn't exist
      profile = await userProfileRepository.create({ user: userId });
    }
    return profile;
  }

  async updateLifestyle(userId, lifestyle) {
    const profile = await userProfileRepository.update(userId, { lifestyle });
    if (!profile) throw new ErrorHandler('Profile not found', 404);
    return profile;
  }

  async updatePreferences(userId, preferences) {
    const profile = await userProfileRepository.update(userId, { preferences });
    if (!profile) throw new ErrorHandler('Profile not found', 404);
    return profile;
  }

  async addToWishlist(userId, productId, wantsRestockAlert = false) {
    const profile = await userProfileRepository.addToWishlist(userId, {
      product: productId,
      wantsRestockAlert,
    });
    if (!profile) throw new ErrorHandler('Profile not found', 404);
    return profile;
  }

  async removeFromWishlist(userId, productId) {
    const profile = await userProfileRepository.removeFromWishlist(userId, productId);
    if (!profile) throw new ErrorHandler('Profile not found', 404);
    return profile;
  }

  async updateNotifications(userId, notifications) {
    const profile = await userProfileRepository.updateNotificationPreferences(userId, notifications);
    if (!profile) throw new ErrorHandler('Profile not found', 404);
    return profile;
  }
}

module.exports = new UserProfileService();
