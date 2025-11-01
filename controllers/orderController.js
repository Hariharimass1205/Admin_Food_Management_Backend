const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderRepository.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { userId, items } = req.body;
      
      if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'UserId and items array are required' });
      }

      // Validate and calculate total
      let totalAmount = 0;
      const validatedItems = [];

      for (const item of items) {
        const { productId, quantity } = item;
        
        if (!productId || !quantity || quantity < 1) {
          return res.status(400).json({ message: 'Each item must have productId and quantity >= 1' });
        }

        const product = await productRepository.findById(productId);
        if (!product) {
          return res.status(404).json({ message: `Product with id ${productId} not found` });
        }

        const itemTotal = product.price * quantity;
        totalAmount += itemTotal;

        validatedItems.push({
          productId,
          quantity,
          price: product.price
        });
      }

      const orderData = {
        userId,
        items: validatedItems,
        totalAmount,
        orderDate: new Date()
      };

      const savedOrder = await orderRepository.create(orderData);
      const populatedOrder = await orderRepository.findById(savedOrder._id);

      res.status(201).json(populatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderController;

