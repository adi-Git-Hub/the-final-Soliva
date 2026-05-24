const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const { connection } = require('../config/redis');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Razorpay = require('razorpay');
const logger = require('../utils/logger');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

const inventoryWorker = new Worker('InventoryQueue', async (job) => {
  logger.info(`[WORKER] Processing Inventory Job: ${job.id} - Type: ${job.name}`);
  const { orderId, items } = job.data;
  
  if (job.name === 'recoverStock') {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        logger.warn(`[WORKER] Order ${orderId} not found during stock recovery.`);
        await session.abortTransaction();
        session.endSession();
        return;
      }
      
      // If order is still pending after X minutes, verify with Razorpay before cancelling
      if (order.orderStatus === 'pending' && order.paymentInfo.status === 'pending') {
        const razorpayOrderId = order.paymentInfo.razorpay_order_id;
        let isActuallyPaid = false;

        if (razorpayOrderId) {
           try {
             const rzpayOrder = await razorpayInstance.orders.fetch(razorpayOrderId);
             if (rzpayOrder && rzpayOrder.status === 'paid') {
                 isActuallyPaid = true;
             }
           } catch (rpErr) {
             logger.warn(`[WORKER] Inventory recovery could not verify Razorpay status for ${razorpayOrderId}. Assuming unpaid.`);
           }
        }

        if (isActuallyPaid) {
            logger.info(`[WORKER] Ghost cancellation prevented! Order ${orderId} is actually paid. Triggering reconciliation.`);
            order.paymentInfo.status = 'paid';
            order.orderStatus = 'paid';
            await order.save({ session });
            await session.commitTransaction();
            return;
        }

        logger.info(`[WORKER] Order ${orderId} verified as abandoned. Restoring stock...`);
        
        // Restore stock
        for (const item of items) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: item.quantity } },
            { session }
          );
        }
        
        order.orderStatus = 'cancelled';
        await order.save({ session });
        
        await session.commitTransaction();
        logger.info(`[WORKER] Successfully recovered stock for abandoned order: ${orderId}`);
      } else {
         // Order is paid or already cancelled/refunded, no need to recover
         await session.abortTransaction();
         logger.info(`[WORKER] Order ${orderId} is ${order.orderStatus}. Stock recovery skipped.`);
      }
    } catch (error) {
      await session.abortTransaction();
      logger.error(`[WORKER ERROR] Inventory recovery failed for order ${orderId}: ${error.message}`);
      throw error;
    } finally {
      session.endSession();
    }
  }
}, { connection });

inventoryWorker.on('failed', (job, err) => {
  logger.error(`[WORKER ERROR] Inventory Job ${job.id} failed: ${err.message}`);
});

module.exports = inventoryWorker;