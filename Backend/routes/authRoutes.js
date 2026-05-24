const express = require('express');
const {
  registerUser,
  loginUser,
  adminLogin,
  logout,
  logoutAll,
  getUserProfile,
  verifyEmail,
  resendOTP,
  forgotPassword,
  verifyForgotOTP,
  resetPassword,
} = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const authValidator = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validate(authValidator.register), registerUser);
router.post('/login', validate(authValidator.login), loginUser);
router.post('/admin-login', validate(authValidator.login), adminLogin);
router.post('/verify-email', validate(authValidator.verifyEmail), verifyEmail);
router.post('/resend-otp', validate(authValidator.forgotPassword), resendOTP);
router.post('/forgot-password', validate(authValidator.forgotPassword), forgotPassword);
router.post('/verify-forgot-otp', validate(authValidator.verifyEmail), verifyForgotOTP);
router.post('/reset-password', validate(authValidator.resetPassword), resetPassword);

router.get('/logout', isAuthenticatedUser, logout);
router.get('/logout-all', isAuthenticatedUser, logoutAll);
router.get('/me', isAuthenticatedUser, getUserProfile);

module.exports = router;