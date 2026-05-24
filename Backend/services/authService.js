const User = require('../models/userModel');
const PendingRegistration = require('../models/pendingRegistrationModel');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const { getOTPTemplate, getWelcomeTemplate, getPasswordChangedTemplate } = require('../utils/emailTemplates');
const { enqueueEmail } = require('../queues/emailQueue');

// Generates a 6-digit OTP + its sha256 hash. Same scheme as
// userModel.methods.generateOTP — kept inline so PendingRegistration (which
// has no User instance) can reuse it.
function makeOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  return { otp, hashedOTP };
}

function otpExpiryDate() {
  const minutes = parseInt(process.env.OTP_EXPIRE, 10) || 10;
  return new Date(Date.now() + minutes * 60 * 1000);
}

class AuthService {
  async register(data) {
    const { name, email, password, username, phoneNumber } = data;
    const normalizedEmail = String(email).toLowerCase();
    const finalUsername = (username || normalizedEmail.split('@')[0]).toLowerCase();

    // Only check the REAL user collection — pending sign-ups live elsewhere
    // and should not lock the email/username/phone slot.
    const userExists = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: finalUsername },
        ...(phoneNumber ? [{ phoneNumber }] : []),
      ],
    });
    if (userExists) {
      throw new ErrorHandler(
        'User with this email, username, or phone number already exists',
        400
      );
    }

    // Hash the password ONCE up-front. Plaintext never sits at rest.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const { otp, hashedOTP } = makeOTP();

    // Upsert — if the user tried to register before and didn't verify,
    // we overwrite the old pending row with the new OTP / details.
    await PendingRegistration.findOneAndUpdate(
      { email: normalizedEmail },
      {
        $set: {
          name,
          username: finalUsername,
          email: normalizedEmail,
          phoneNumber: phoneNumber || undefined,
          passwordHash,
          emailOTP: hashedOTP,
          otpExpire: otpExpiryDate(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (process.env.NODE_ENV === 'development') {
      logger.info(`[DEV-OTP] register · email=${normalizedEmail} · otp=${otp} · expiresInMin=${process.env.OTP_EXPIRE}`);
    }

    const html = getOTPTemplate(otp, 'verification');
    await enqueueEmail('registrationOTP', {
      email: normalizedEmail,
      subject: 'Soliva - Email Verification',
      html,
    });

    return { email: normalizedEmail };
  }

  async verifyEmail(email, otp, req) {
    const normalizedEmail = String(email).toLowerCase();
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    // Look up the pending row by email + matching OTP + not-yet-expired.
    const pending = await PendingRegistration.findOne({
      email: normalizedEmail,
      emailOTP: hashedOTP,
      otpExpire: { $gt: new Date() },
    });

    if (!pending) throw new ErrorHandler('Invalid or expired OTP', 400);

    // Re-check uniqueness right before insert (defensive vs. parallel sign-ups).
    const conflict = await User.findOne({
      $or: [
        { email: pending.email },
        { username: pending.username },
        ...(pending.phoneNumber ? [{ phoneNumber: pending.phoneNumber }] : []),
      ],
    });
    if (conflict) {
      await PendingRegistration.deleteOne({ _id: pending._id });
      throw new ErrorHandler('Account already exists. Please sign in.', 400);
    }

    const newSession = this.generateSession(req);

    // Use the raw collection so the User pre('save') hook does NOT re-hash
    // the already-bcrypt-hashed password.
    let inserted;
    try {
      inserted = await User.collection.insertOne({
        name: pending.name,
        username: pending.username,
        email: pending.email,
        ...(pending.phoneNumber ? { phoneNumber: pending.phoneNumber } : {}),
        password: pending.passwordHash,
        role: 'user',
        isVerified: true,
        loginAttempts: 0,
        sessions: [newSession],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      });
    } catch (err) {
      // E11000 = duplicate key — someone with overlapping email/username/phone
      // raced us to insert first. Clean up and surface a friendly message.
      if (err && err.code === 11000) {
        await PendingRegistration.deleteOne({ _id: pending._id });
        throw new ErrorHandler('Account already exists. Please sign in.', 400);
      }
      throw err;
    }

    // Pending row served its purpose.
    await PendingRegistration.deleteOne({ _id: pending._id });

    // Load the new doc through Mongoose so sendToken's getSignedJwtToken works.
    const user = await User.findById(inserted.insertedId);

    const html = getWelcomeTemplate(user.name);
    await enqueueEmail('welcomeEmail', {
      email: user.email,
      subject: 'Welcome to Soliva!',
      html,
    });

    return { user, sessionId: newSession.sessionId };
  }

  async login(email, password, req, isAdmin = false) {
    if (!email || !password) throw new ErrorHandler('Please enter email and password', 400);

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new ErrorHandler(isAdmin ? 'Invalid admin credentials' : 'Invalid email or password', 401);

    if (isAdmin && user.role !== 'admin') {
      throw new ErrorHandler('Invalid admin credentials', 401);
    }

    if (!user.isVerified) throw new ErrorHandler('Please verify your email first', 401);

    if (user.isLocked) {
      const unlockTime = new Date(user.lockUntil).toLocaleTimeString();
      throw new ErrorHandler(`Account is temporarily locked due to multiple failed login attempts. Please try again after ${unlockTime}`, 403);
    }

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000;
      }
      await user.save({ validateBeforeSave: false });
      throw new ErrorHandler(isAdmin ? 'Invalid admin credentials' : 'Invalid email or password', 401);
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    
    const newSession = this.generateSession(req);
    user.sessions.push(newSession);

    await user.save();
    user.password = undefined;

    return { user, sessionId: newSession.sessionId };
  }

  async resendVerificationOTP(email) {
    const normalizedEmail = String(email).toLowerCase();

    // Look up the PENDING registration — not the real User collection.
    const pending = await PendingRegistration.findOne({ email: normalizedEmail });
    if (!pending) {
      throw new ErrorHandler(
        'No pending registration found for this email. Please sign up first.',
        404
      );
    }

    // Rate-limit: at most one resend per minute.
    const MIN_RESEND_MS = 60 * 1000;
    const sinceLast = Date.now() - new Date(pending.updatedAt).getTime();
    if (sinceLast < MIN_RESEND_MS) {
      const waitSec = Math.ceil((MIN_RESEND_MS - sinceLast) / 1000);
      throw new ErrorHandler(
        `Please wait ${waitSec}s before requesting another OTP`,
        429
      );
    }

    const { otp, hashedOTP } = makeOTP();
    pending.emailOTP = hashedOTP;
    pending.otpExpire = otpExpiryDate();
    await pending.save();

    if (process.env.NODE_ENV === 'development') {
      logger.info(`[DEV-OTP] resend-otp · email=${normalizedEmail} · otp=${otp} · expiresInMin=${process.env.OTP_EXPIRE}`);
    }

    const html = getOTPTemplate(otp, 'verification');
    await enqueueEmail('registrationOTP', {
      email: normalizedEmail,
      subject: 'Soliva - Email Verification Resend',
      html,
    });

    return { email: normalizedEmail };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new ErrorHandler('User not found with this email', 404);

    if (user.forgotPasswordExpire && user.forgotPasswordExpire > Date.now() + (process.env.OTP_EXPIRE - 1) * 60 * 1000) {
      throw new ErrorHandler('Please wait before requesting another OTP', 429);
    }

    const { otp, hashedOTP } = user.generateOTP();
    user.forgotPasswordOTP = hashedOTP;
    user.forgotPasswordExpire = Date.now() + process.env.OTP_EXPIRE * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // DEV-ONLY OTP trace (see registration handler).
    if (process.env.NODE_ENV === 'development') {
      logger.info(`[DEV-OTP] forgot-password · email=${user.email} · otp=${otp} · expiresInMin=${process.env.OTP_EXPIRE}`);
    }

    const html = getOTPTemplate(otp, 'forgotPassword');
    await enqueueEmail('forgotPasswordOTP', {
      email: user.email,
      subject: 'Soliva - Password Recovery',
      html,
    });
    
    return { email: user.email };
  }

  async verifyForgotOTP(email, otp) {
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      forgotPasswordOTP: hashedOTP,
      forgotPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new ErrorHandler('Invalid or expired OTP', 400);
    return true;
  }

  async resetPassword(email, otp, password, req) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new ErrorHandler('Password must contain at least 6 characters, including letters, numbers, and special characters', 400);
    }

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      forgotPasswordOTP: hashedOTP,
      forgotPasswordExpire: { $gt: Date.now() },
    });

    if (!user) throw new ErrorHandler('Invalid or expired OTP', 400);

    user.password = password;
    user.forgotPasswordOTP = undefined;
    user.forgotPasswordExpire = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    
    const newSession = this.generateSession(req);
    user.sessions.push(newSession);
    await user.save();

    const html = getPasswordChangedTemplate(user.name);
    await enqueueEmail('passwordChanged', {
      email: user.email,
      subject: 'Soliva - Password Changed',
      html,
    });

    return { user, sessionId: newSession.sessionId };
  }

  async logout(userId, sessionId) {
    const user = await User.findById(userId);
    if (user) {
      user.sessions = user.sessions.filter(s => s.sessionId !== sessionId);
      await user.save({ validateBeforeSave: false });
    }
  }

  async logoutAll(userId) {
    const user = await User.findById(userId);
    if (user) {
      user.sessions = [];
      await user.save({ validateBeforeSave: false });
    }
  }

  generateSession(req) {
    return {
      sessionId: crypto.randomBytes(16).toString('hex'),
      ip: req.ip || req.connection.remoteAddress,
      device: req.headers['user-agent'] || 'Unknown Device',
      lastActive: Date.now(),
    };
  }
}

module.exports = new AuthService();