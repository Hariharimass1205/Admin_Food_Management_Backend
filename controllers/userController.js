const userRepository = require('../repositories/userRepository');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userRepository.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, mobile } = req.body;
      
      if (!name || !email || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await userRepository.create({ name, email, mobile });
      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, mobile } = req.body;
      const { id } = req.params;

      const user = await userRepository.update(id, { name, email, mobile });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userRepository.delete(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;

