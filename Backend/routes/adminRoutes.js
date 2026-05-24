const express = require('express');
const { getDashboardStats } = require('../controllers/adminController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/dashboard',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getDashboardStats
);

module.exports = router;