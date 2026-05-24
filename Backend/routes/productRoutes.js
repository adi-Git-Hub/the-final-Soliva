const express = require('express');
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const productValidator = require('../validators/productValidator');

const router = express.Router();

// ── Public routes ─────────────────────────────────────────────────────
router.get('/', getProducts);
// :idOrSlug — sniffed at the service layer so the URL is human-friendly.
router.get('/:idOrSlug', validate(productValidator.getProductByIdOrSlug), getSingleProduct);

// ── Admin routes (ObjectId only) ──────────────────────────────────────
router.post(
  '/admin/new',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  validate(productValidator.createProduct),
  createProduct
);

router.put(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  validate(productValidator.updateProduct),
  updateProduct
);

router.delete(
  '/admin/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  validate(productValidator.getProductByIdAdmin),
  deleteProduct
);

module.exports = router;
