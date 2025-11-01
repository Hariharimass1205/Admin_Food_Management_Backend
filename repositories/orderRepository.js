const Order = require('../models/Order');

const orderRepository = {
  findAll: async () => {
    return await Order.find()
      .populate('userId', 'name email mobile')
      .populate('items.productId', 'name price')
      .sort({ orderDate: -1 });
  },

  findById: async (id) => {
    return await Order.findById(id)
      .populate('userId', 'name email mobile')
      .populate('items.productId', 'name price');
  },

  create: async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
  },

  getOrderStats: async () => {
    return await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);
  }
};

module.exports = orderRepository;

