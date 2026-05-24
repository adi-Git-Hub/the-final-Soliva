const express = require('express');
const {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  mergeCart,
} = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const cartValidator = require('../validators/cartValidator');

const router = express.Router();

router.use(isAuthenticatedUser);

router.route('/')
  .get(getUserCart)
  .post(validate(cartValidator.addToCart), addToCart)
  .delete(clearCart);

// Guest → server cart merge (used by the frontend right after login).
router.post('/merge', validate(cartValidator.mergeCart), mergeCart);

router.route('/:productId')
  .put(validate(cartValidator.updateCartItem), updateCartItem)
  .delete(validate(cartValidator.removeFromCart), removeFromCart);

module.exports = router;