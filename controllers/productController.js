const productRepository = require('../repositories/productRepository');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productRepository.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, categoryId, price, status } = req.body;
      
      if (!name || !categoryId || price === undefined) {
        return res.status(400).json({ message: 'Name, categoryId, and price are required' });
      }

      const product = await productRepository.create({
        name,
        categoryId,
        price,
        status: status || 'active'
      });
      
      const populatedProduct = await productRepository.findById(product._id);
      res.status(201).json(populatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, categoryId, price, status } = req.body;
      const { id } = req.params;

      const product = await productRepository.update(id, {
        name,
        categoryId,
        price,
        status
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productRepository.delete(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productController;

