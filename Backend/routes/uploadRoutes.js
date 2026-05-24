const express = require('express');
const upload = require('../middleware/multer');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const router = express.Router();

// @desc    Upload an image
// @route   POST /api/v1/upload
// @access  Private/Admin
router.post(
  '/',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  upload.single('image'),
  catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      url: url,
    });
  })
);

module.exports = router;