const User = require('../models/userModel');
const PendingRegistration = require('../models/pendingRegistrationModel');
const AuthAuditLog = require('../models/authAuditLogModel');

class AuthRepository {
  async findUserByEmail(email, selectPassword = false) {
    let query = User.findOne({ email });
    if (selectPassword) query = query.select('+password');
    return await query;
  }

  async findUserByUsername(username) {
    return await User.findOne({ username });
  }

  async findUserByPhone(phoneNumber) {
    return await User.findOne({ phoneNumber });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async findUserBySession(sessionId) {
    return await User.findOne({ 'sessions.sessionId': sessionId });
  }

  async findPendingRegistration(email) {
    return await PendingRegistration.findOne({ email });
  }

  async createAuditLog(logData) {
    return await AuthAuditLog.create(logData);
  }

  async updatePendingRegistration(email, data) {
    return await PendingRegistration.findOneAndUpdate(
      { email },
      { $set: data },
      { upsert: true, new: true }
    );
  }

  async deletePendingRegistration(email) {
    return await PendingRegistration.deleteOne({ email });
  }

  async saveUser(user) {
    return await user.save();
  }

  async createUser(userData) {
    return await User.create(userData);
  }
}

module.exports = new AuthRepository();
