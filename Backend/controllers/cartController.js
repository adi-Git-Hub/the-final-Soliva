const cartService = require('../services/cartService');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendResponse = require('../utils/sendResponse');

// @desc    Get user cart
// @route   GET /api/v1/cart
// @access  Private
exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await cartService.getCart(req.user.id);

  return sendResponse(res, {
    data: { cart },
  });
});

// @desc    Add item to cart
// @route   POST /api/v1/cart
// @access  Private
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user.id, productId, quantity);

  return sendResponse(res, {
    data: { cart },
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:productId
// @access  Private
exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await cartService.removeFromCart(req.user.id, req.params.productId);

  return sendResponse(res, {
    data: { cart },
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/:productId
// @access  Private
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await cartService.updateCartItem(req.user.id, req.params.productId, quantity);

  return sendResponse(res, {
    data: { cart },
  });
});

// @desc    Clear user cart
// @route   DELETE /api/v1/cart
// @access  Private
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  await cartService.clearCart(req.user.id);

  return sendResponse(res, {
    message: 'Cart cleared successfully',
  });
});

// @desc    Merge a guest cart into the user's server cart at sign-in.
// @route   POST /api/v1/cart/merge
// @access  Private
exports.mergeCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await cartService.mergeCart(req.user.id, req.body.items || []);

  return sendResponse(res, {
    data: { cart },
  });
});