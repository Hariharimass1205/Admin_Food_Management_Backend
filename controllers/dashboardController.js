const dashboardRepository = require('../repositories/dashboardRepository');

const dashboardController = {
  getStats: async (req, res) => {
    try {
      const stats = await dashboardRepository.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = dashboardController;

