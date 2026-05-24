const express = require('express');
const { getCategories } = require('../controllers/categoryController');

const router = express.Router();

// Public list. Single-category lookup is derived on the client by filtering
// this list — categories are a tiny dataset, so we don't need a /:slug route.
router.get('/', getCategories);

module.exports = router;
