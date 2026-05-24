const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler('The user belonging to this token no longer exists.', 401));
    }

    // Verify if the session still exists
    const sessionExists = user.sessions.some(s => s.sessionId === decoded.sessionId);
    if (!sessionExists) {
      return next(new ErrorHandler('Session expired or logged out. Please login again.', 401));
    }

    req.user = user;
    req.sessionId = decoded.sessionId;

    next();
  } catch (error) {
    next(new ErrorHandler('Invalid or expired token', 401));
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};