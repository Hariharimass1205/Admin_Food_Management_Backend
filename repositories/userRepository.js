const User = require('../models/User');

const userRepository = {
  findAll: async () => {
    return await User.find().sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return await User.findById(id);
  },

  create: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  update: async (id, userData) => {
    return await User.findByIdAndUpdate(
      id,
      userData,
      { new: true, runValidators: true }
    );
  },

  delete: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  findByEmail: async (email) => {
    return await User.findOne({ email });
  }
};

module.exports = userRepository;

