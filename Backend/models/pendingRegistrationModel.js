const mongoose = require('mongoose');

// Pending registration = a sign-up that hasn't been OTP-verified yet.
// We keep these OUT of the real `users` collection so:
//   - an unverified attempt does not lock the email/username
//   - bots that hammer /register don't pollute the user table
//   - abandoned sign-ups auto-vanish via the TTL index
//
// The real User document is only created once verifyEmail() succeeds; at
// that point we copy fields over (password is already bcrypt-hashed here)
// and delete the pending row.
const pendingRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, lowercase: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,    // one pending row per email
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String },

    // bcrypt hash of the user's chosen password — never store plaintext
    passwordHash: { type: String, required: true },

    // sha256 hash of the 6-digit OTP — same scheme as User.emailOTP
    emailOTP: { type: String, required: true },
    otpExpire: { type: Date, required: true },
  },
  { timestamps: true }
);

// TTL: Mongo will auto-purge pending rows 30 minutes after creation.
// OTP itself expires sooner (per OTP_EXPIRE env, default 10 min) — this is
// just the safety net so the collection doesn't grow forever.
pendingRegistrationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 60 }
);

module.exports = mongoose.model('PendingRegistration', pendingRegistrationSchema);
