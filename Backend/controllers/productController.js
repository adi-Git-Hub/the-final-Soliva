const productService = require('../services/productService');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendResponse = require('../utils/sendResponse');

// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const result = await productService.getProducts(req.query);

  return sendResponse(res, {
    data: {
      count: result.products.length,
      total: result.total,
      page: result.page,
      limit: result.limit,
      products: result.products,
    },
  });
});

// @desc    Get single product details (by slug OR ObjectId)
// @route   GET /api/v1/products/:idOrSlug
// @access  Public
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productService.getSingleProduct(req.params.idOrSlug);

  return sendResponse(res, {
    data: { product },
  });
});

// @desc    Create new product
// @route   POST /api/v1/products/admin/new
// @access  Private/Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productService.createProduct(req.body, req.user.id);

  return sendResponse(res, {
    statusCode: 201,
    data: { product },
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/admin/:id
// @access  Private/Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  return sendResponse(res, {
    data: { product },
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/admin/:id
// @access  Private/Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);

  return sendResponse(res, {
    message: 'Product deleted successfully',
  });
});
