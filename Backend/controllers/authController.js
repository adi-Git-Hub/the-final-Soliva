const authService = require('../services/authService');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendResponse = require('../utils/sendResponse');

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const result = await authService.register(req.body);
  
  return sendResponse(res, {
    statusCode: 201,
    message: `OTP sent to email: ${result.email}`,
  });
});

// @desc    Verify Email OTP
// @route   POST /api/v1/auth/verify-email
// @access  Public
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  const { user, sessionId } = await authService.verifyEmail(email, otp, req);
  sendToken(user, 200, res, sessionId);
});

// @desc    Resend Verification OTP
// @route   POST /api/v1/auth/resend-otp
// @access  Public
exports.resendOTP = catchAsyncErrors(async (req, res, next) => {
  const result = await authService.resendVerificationOTP(req.body.email);
  
  return sendResponse(res, {
    message: `OTP resent to email: ${result.email}`,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, sessionId } = await authService.login(email, password, req);
  sendToken(user, 200, res, sessionId);
});

// @desc    Admin Login
// @route   POST /api/v1/auth/admin-login
// @access  Public
exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, sessionId } = await authService.login(email, password, req, true);
  sendToken(user, 200, res, sessionId);
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const result = await authService.forgotPassword(req.body.email);
  
  return sendResponse(res, {
    message: `Recovery OTP sent to email: ${result.email}`,
  });
});

// @desc    Verify Forgot Password OTP
// @route   POST /api/v1/auth/verify-forgot-otp
// @access  Public
exports.verifyForgotOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  await authService.verifyForgotOTP(email, otp);
  
  return sendResponse(res, {
    message: 'OTP verified, you can now reset your password',
  });
});

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
// @access  Public
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email, otp, password } = req.body;
  const { user, sessionId } = await authService.resetPassword(email, otp, password, req);
  sendToken(user, 200, res, sessionId);
});

// @desc    Logout user (current device)
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = catchAsyncErrors(async (req, res, next) => {
  await authService.logout(req.user.id, req.sessionId);
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  
  return sendResponse(res, {
    message: 'Logged out successfully',
  });
});

// @desc    Logout all devices
// @route   GET /api/v1/auth/logout-all
// @access  Private
exports.logoutAll = catchAsyncErrors(async (req, res, next) => {
  await authService.logoutAll(req.user.id);
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  
  return sendResponse(res, {
    message: 'Logged out from all devices successfully',
  });
});

// @desc    Get currently logged in user details
// @route   GET /api/v1/auth/me
// @access  Private
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  return sendResponse(res, {
    data: { user: req.user },
  });
});