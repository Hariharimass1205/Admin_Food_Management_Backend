const Category = require('../models/Category');

const categoryRepository = {
  findAll: async () => {
    return await Category.find().sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return await Category.findById(id);
  },

  create: async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
  },

  update: async (id, categoryData) => {
    return await Category.findByIdAndUpdate(
      id,
      categoryData,
      { new: true, runValidators: true }
    );
  },

  delete: async (id) => {
    return await Category.findByIdAndDelete(id);
  },

  findByName: async (name) => {
    return await Category.findOne({ name });
  }
};

module.exports = categoryRepository;

