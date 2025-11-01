const Product = require('../models/Product');

const productRepository = {
  findAll: async () => {
    return await Product.find()
      .populate('categoryId', 'name description')
      .sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return await Product.findById(id)
      .populate('categoryId', 'name description');
  },

  create: async (productData) => {
    const product = new Product(productData);
    return await product.save();
  },

  update: async (id, productData) => {
    return await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    )
      .populate('categoryId', 'name description');
  },

  delete: async (id) => {
    return await Product.findByIdAndDelete(id);
  },

  count: async () => {
    return await Product.countDocuments();
  }
};

module.exports = productRepository;

