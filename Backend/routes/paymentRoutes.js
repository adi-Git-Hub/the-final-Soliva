const express = require('express');
const { razorpayWebhook } = require('../controllers/paymentController');
const paymentService = require('../services/paymentService');

const router = express.Router();

router.post('/webhook', razorpayWebhook);

// Temporary test route for Razorpay verification
router.post('/test-order', async (req, res) => {
  try {
    const amount = req.body.amount || 1;
    const order = await paymentService.createRazorpayOrder(amount);
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
