const Razorpay = require('razorpay');
const crypto = require('crypto');
const logger = require('../utils/logger');

class PaymentService {
  constructor() {
    this.razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
  }

  async createRazorpayOrder(amount) {
    const isMock = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id';
    
    if (isMock) {
      logger.info(`[PAYMENT] Creating Mock Razorpay Order: Amount ${amount}`);
      return {
        id: `mock_order_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: 'INR',
      };
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    try {
      const order = await this.razorpayInstance.orders.create(options);
      logger.info(`[PAYMENT] Razorpay Order Created: ${order.id}`);
      return order;
    } catch (error) {
      logger.error(`[PAYMENT] Razorpay Order Creation Failed: ${error.message}`);
      throw error;
    }
  }

  verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret')
      .update(sign.toString())
      .digest('hex');

    const isTestMode = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id';

    if (isTestMode && razorpay_signature === 'mock_signature') {
      logger.info(`[PAYMENT] Mock Signature Verified for Order: ${razorpay_order_id}`);
      return true;
    }

    const isValid = razorpay_signature === expectedSign;
    if (isValid) {
      logger.info(`[PAYMENT] Signature Verified for Order: ${razorpay_order_id}`);
    } else {
      logger.warn(`[PAYMENT] Signature Verification Failed for Order: ${razorpay_order_id}`);
    }
    
    return isValid;
  }
}

module.exports = new PaymentService();