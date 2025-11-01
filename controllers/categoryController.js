const categoryRepository = require('../repositories/categoryRepository');

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryRepository.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const category = await categoryRepository.create({ name, description });
      res.status(201).json(category);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      const { id } = req.params;

      const category = await categoryRepository.update(id, { name, description });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryRepository.delete(id);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoryController;

