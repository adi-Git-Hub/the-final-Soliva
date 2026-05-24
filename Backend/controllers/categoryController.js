const productService = require('../services/productService');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendResponse = require('../utils/sendResponse');

// @desc    List all categories derived from the Product collection
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await productService.getCategoriesWithCounts();

  return sendResponse(res, {
    data: {
      count: categories.length,
      categories,
    },
  });
});
