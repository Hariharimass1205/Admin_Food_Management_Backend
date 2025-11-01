const User = require('../models/User');
const Product = require('../models/Product');
const orderRepository = require('./orderRepository');

const dashboardRepository = {
  getStats: async () => {
    const [stats] = await orderRepository.getOrderStats();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    return {
      totalUsers: totalUsers || 0,
      totalProducts: totalProducts || 0,
      totalOrders: stats?.totalOrders || 0,
      totalRevenue: stats?.totalRevenue || 0
    };
  }
};

module.exports = dashboardRepository;

