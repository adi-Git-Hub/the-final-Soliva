const express = require('express');
const { razorpayWebhook } = require('../controllers/paymentController');

const router = express.Router();

router.post('/webhook', razorpayWebhook);

module.exports = router;