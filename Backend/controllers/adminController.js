const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendResponse = require('../utils/sendResponse');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/v1/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();

  const orders = await Order.find().lean(); // Use lean() for performance
  let totalRevenue = 0;
  orders.forEach((order) => {
    // Case-insensitive check or lowercase strict check
    if (order.paymentInfo && order.paymentInfo.status && order.paymentInfo.status.toLowerCase() === 'paid') {
      totalRevenue += order.totalPrice;
    }
  });

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .lean();

  return sendResponse(res, {
    data: {
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue,
        recentOrders,
      }
    }
  });
});