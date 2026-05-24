const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please enter your username'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Public URL of the user's avatar image. `null` means "no upload" — the
    // frontend renders a deterministic initials-on-color fallback in that case.
    avatarUrl: {
      type: String,
      default: null,
    },
    emailOTP: String,
    otpExpire: Date,
    forgotPasswordOTP: String,
    forgotPasswordExpire: Date,
    
    // Login Security
    loginAttempts: {
      type: Number,
      required: true,
      default: 0,
    },
    lockUntil: {
      type: Number,
    },
    
    // Device Session Tracking
    sessions: [
      {
        sessionId: String,
        ip: String,
        device: String,
        lastActive: Date,
      },
    ],
  },
  { timestamps: true }
);

// Virtual for lock status
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return (now expects a sessionId)
userSchema.methods.getSignedJwtToken = function (sessionId) {
  return jwt.sign({ id: this._id, sessionId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate 6-digit OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Hash OTP and set to field
  const hashedOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');

  return { otp, hashedOTP };
};

module.exports = mongoose.model('User', userSchema);