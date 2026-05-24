const { Worker } = require('bullmq');
const { connection } = require('../config/redis');
const Order = require('../models/orderModel');
const Razorpay = require('razorpay');
const logger = require('../utils/logger');
const paymentService = require('../services/paymentService');
const { inventoryQueue, enqueueInventoryRecovery } = require('../queues/inventoryQueue');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

const paymentWorker = new Worker('PaymentQueue', async (job) => {
  logger.info(`[WORKER] Processing Payment Job: ${job.id} - Type: ${job.name}`);
  const { orderId, razorpayOrderId } = job.data;
  
  if (job.name === 'recoverPayment') {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        logger.warn(`[WORKER] Order ${orderId} not found during payment recovery.`);
        return;
      }

      if (order.orderStatus === 'pending' && order.paymentInfo.status === 'pending') {
        logger.info(`[WORKER] Checking Razorpay status for Order ${orderId} (RP_ID: ${razorpayOrderId})`);
        
        // Fetch real status from Razorpay
        let rzpayOrder;
        try {
           rzpayOrder = await razorpayInstance.orders.fetch(razorpayOrderId);
        } catch (rpErr) {
           logger.warn(`[WORKER] Could not fetch Razorpay order ${razorpayOrderId}: ${rpErr.message}`);
           // It might be a mock order or network issue.
        }

        if (rzpayOrder && rzpayOrder.status === 'paid') {
            logger.info(`[WORKER] Payment actually succeeded for Order ${orderId}. Reconciling...`);
            order.paymentInfo.status = 'paid';
            order.orderStatus = 'paid';
            await order.save();
        } else {
            logger.info(`[WORKER] Payment not completed for Order ${orderId}. Leaving as pending, inventory recovery will handle cancellation.`);
        }
      } else {
        logger.info(`[WORKER] Order ${orderId} is ${order.orderStatus}. Payment recovery skipped.`);
      }
    } catch (error) {
      logger.error(`[WORKER ERROR] Payment recovery failed for order ${orderId}: ${error.message}`);
      throw error; // Let BullMQ retry
    }
  }
}, { connection });

paymentWorker.on('failed', (job, err) => {
  logger.error(`[WORKER ERROR] Payment Job ${job.id} failed: ${err.message}`);
});

module.exports = paymentWorker;