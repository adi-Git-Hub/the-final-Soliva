const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const paymentService = require('./paymentService');
const ErrorHandler = require('../utils/errorHandler');
const logger = require('../utils/logger');
const { enqueuePaymentRecovery } = require('../queues/paymentQueue');
const { enqueueInventoryRecovery } = require('../queues/inventoryQueue');

class OrderService {
  async createOrder(data, userId, idempotencyKey) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      if (idempotencyKey) {
        const existingOrder = await Order.findOne({ idempotencyKey }).session(session);
        if (existingOrder) {
          await session.abortTransaction();
          session.endSession();
          logger.info(`[ORDER] Idempotent request. Returned existing order: ${existingOrder._id}`);
          return {
             order: existingOrder,
             razorpayOrderId: existingOrder.paymentInfo.razorpay_order_id,
             amount: Math.round(existingOrder.totalPrice * 100),
          };
        }
      }

      const { shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = data;

      // 1. Atomic Stock Decrement & Check
      for (const item of orderItems) {
        const product = await Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { new: true, session }
        );

        if (!product) {
          throw new ErrorHandler(`Product ${item.name} is out of stock or insufficient quantity`, 400);
        }
      }

      // 2. Razorpay Order Creation
      const razorpayOrder = await paymentService.createRazorpayOrder(totalPrice);

      // 3. Order Creation
      const order = await Order.create([{
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo: {
          razorpay_order_id: razorpayOrder.id,
          status: 'pending',
        },
        orderStatus: 'pending',
        user: userId,
        idempotencyKey,
      }], { session });

      // 4. Cart Cleanup
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { cartItems: [], totalPrice: 0 } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      
      const createdOrder = order[0];
      logger.info(`[ORDER] New Order Created: ${createdOrder._id} for User: ${userId}`);

      // 5. Background Jobs (Enqueued after commit to ensure DB consistency)
      await enqueueInventoryRecovery(createdOrder._id, orderItems, 15 * 60 * 1000); // 15 mins for cart abandon
      await enqueuePaymentRecovery(createdOrder._id, razorpayOrder.id, 30 * 60 * 1000); // 30 mins to check Razorpay directly

      return {
        order: createdOrder,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`[TRANSACTION ERROR] Order creation failed: ${error.message}`);
      throw error;
    }
  }

  async verifyPayment(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = data;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const isValid = paymentService.verifySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!isValid) {
        logger.warn(`[PAYMENT] Invalid Payment Signature for Order: ${orderId}`);
        throw new ErrorHandler('Invalid signature sent!', 400);
      }

      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new ErrorHandler('Order not found', 404);
      }

      // Idempotency check for payment verification
      if (order.paymentInfo.status === 'paid' || order.orderStatus === 'paid') {
        await session.abortTransaction();
        session.endSession();
        logger.info(`[PAYMENT] Order ${orderId} is already paid. Idempotent return.`);
        return true;
      }

      order.paymentInfo = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: 'paid',
      };
      
      // State transition pending -> paid
      if (order.orderStatus === 'pending') {
          order.orderStatus = 'paid';
      }

      await order.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      
      logger.info(`[PAYMENT] Order ${orderId} marked as PAID`);
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`[TRANSACTION ERROR] Payment verification failed: ${error.message}`);
      throw error;
    }
  }

  async getSingleOrder(id) {
    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) {
      throw new ErrorHandler('Order not found with this ID', 404);
    }
    return order;
  }

  async getUserOrders(userId) {
    return await Order.find({ user: userId });
  }

  async cancelOrder(orderId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new ErrorHandler('Order not found', 404);
      }

      if (order.user.toString() !== userId.toString()) {
        throw new ErrorHandler('You are not authorized to cancel this order', 403);
      }

      const validCancelStates = ['pending', 'confirmed', 'paid', 'packed'];
      if (!validCancelStates.includes(order.orderStatus)) {
        throw new ErrorHandler(`Cannot cancel order in ${order.orderStatus} state`, 400);
      }

      // Restore stock
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }

      order.orderStatus = 'cancelled';
      await order.save({ session });

      await session.commitTransaction();
      session.endSession();
      
      logger.info(`[ORDER] Order Cancelled and stock restored: ${orderId} by User: ${userId}`);
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`[TRANSACTION ERROR] Order cancellation failed: ${error.message}`);
      throw error;
    }
  }

  async getAllOrders() {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    return { orders, totalAmount };
  }

  async updateOrder(orderId, status) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new ErrorHandler('Order not found with this ID', 404);
      }

      const validTransitions = {
        'pending': ['paid', 'cancelled'],
        'paid': ['confirmed', 'packed', 'cancelled', 'refunded'],
        'confirmed': ['packed', 'shipped', 'cancelled', 'refunded'],
        'packed': ['shipped', 'cancelled', 'refunded'],
        'shipped': ['delivered', 'cancelled', 'refunded'],
        'delivered': ['refunded'],
        'cancelled': [],
        'refunded': [],
      };

      const oldStatus = order.orderStatus;
      
      if (!validTransitions[oldStatus].includes(status)) {
        throw new ErrorHandler(`Invalid state transition from ${oldStatus} to ${status}`, 400);
      }

      // If transitioning to cancelled or refunded from a non-restored state, restore stock
      if ((status === 'cancelled' || status === 'refunded') && (oldStatus !== 'cancelled' && oldStatus !== 'refunded')) {
         for (const item of order.orderItems) {
            await Product.findByIdAndUpdate(
               item.product,
               { $inc: { stock: item.quantity } },
               { session }
            );
         }
      }

      order.orderStatus = status;
      if (status === 'delivered') {
        order.deliveredAt = Date.now();
      }

      await order.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      
      logger.info(`[ADMIN] Order Status Updated: ${orderId} (${oldStatus} -> ${status})`);
      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      logger.error(`[TRANSACTION ERROR] Order update failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new OrderService();