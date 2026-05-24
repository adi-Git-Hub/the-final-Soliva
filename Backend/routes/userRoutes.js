const express = require('express');
const { updateAvatar, removeAvatar } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// All /users routes are user-authenticated.
router.use(isAuthenticatedUser);

// Avatar upload — multipart field name MUST be "avatar".
router
  .route('/me/avatar')
  .post(upload.single('avatar'), updateAvatar)
  .delete(removeAvatar);

module.exports = router;
