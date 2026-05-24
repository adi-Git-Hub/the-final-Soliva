const express = require('express');
const { getSystemHealth } = require('../controllers/systemController');

const router = express.Router();

router.get('/health', getSystemHealth);

module.exports = router;