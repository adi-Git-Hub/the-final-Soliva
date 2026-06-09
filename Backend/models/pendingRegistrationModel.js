const mongoose = require('mongoose');

const pendingRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, lowercase: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String },
    passwordHash: { type: String, required: true },
    emailOTP: { type: String, required: true },
    otpExpire: { type: Date, required: true, index: true },
    retryCount: { type: Number, default: 0 },
    lastResendAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

pendingRegistrationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 60 }
);

module.exports = mongoose.model('PendingRegistration', pendingRegistrationSchema);
