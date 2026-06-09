const Address = require('../models/addressModel');

class AddressRepository {
  async findByUserId(userId) {
    return await Address.find({ user: userId }).sort({ isDefault: -1, usageCount: -1, createdAt: -1 });
  }

  async findById(id) {
    return await Address.findById(id);
  }

  async create(addressData) {
    return await Address.create(addressData);
  }

  async update(id, userId, updateData) {
    return await Address.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async delete(id, userId) {
    return await Address.findOneAndDelete({ _id: id, user: userId });
  }

  async unsetDefaults(userId) {
    return await Address.updateMany(
      { user: userId, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  async incrementUsage(id) {
    return await Address.findByIdAndUpdate(id, { $inc: { usageCount: 1 } });
  }
}

module.exports = new AddressRepository();
