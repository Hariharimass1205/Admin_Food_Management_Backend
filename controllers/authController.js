const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const authRepository = require('../repositories/authRepository');

// Generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin.id, username: admin.username, email: admin.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const admin = await authRepository.findByEmail(email);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(admin);

      res.json({
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      // req.user is set by authenticateToken middleware
      const admin = await authRepository.findById(req.user.id);
      
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      res.json({
        id: admin.id,
        username: admin.username,
        email: admin.email
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;

