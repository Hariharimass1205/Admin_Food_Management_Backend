// Dummy admin data stored in memory
// In production, this would be fetched from a database
const DUMMY_ADMIN = {
  id: 'admin-001',
  username: 'admin',
  email: 'admin@gmail.com',
  password: 'Hari@123'
};

const authRepository = {
  findByEmail: async (email) => {
    // In production, query database: return await Admin.findOne({ email });
    if (email === DUMMY_ADMIN.email) {
      return DUMMY_ADMIN;
    }
    return null;
  },

  findById: async (id) => {
    // In production, query database: return await Admin.findById(id);
    if (id === DUMMY_ADMIN.id) {
      return DUMMY_ADMIN;
    }
    return null;
  }
};

module.exports = authRepository;

