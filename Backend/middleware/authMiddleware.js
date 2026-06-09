const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
       return next(new ErrorHandler('User not found', 404));
    }

    // Verify the session is still active and valid
    const session = user.sessions.find(s => s.sessionId === decoded.sessionId);
    if (!session || session.expiresAt < new Date()) {
       return next(new ErrorHandler('Session expired or revoked. Please login again.', 401));
    }

    req.user = user;
    req.sessionId = decoded.sessionId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
       return next(new ErrorHandler('Access token expired', 401));
    }
    return next(new ErrorHandler('Invalid access token', 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
