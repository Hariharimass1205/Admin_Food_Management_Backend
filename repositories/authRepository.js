
const DUMMY_ADMIN = {
  id: 'admin-001',
  username: 'admin',
  email: 'admin@gmail.com',
  password: 'Hari@123'
};

const authRepository = {
  findByEmail: async (email) => {
    if (email === DUMMY_ADMIN.email) {
      return DUMMY_ADMIN;
    }
    return null;
  },

  findById: async (id) => {
    if (id === DUMMY_ADMIN.id) {
      return DUMMY_ADMIN;
    }
    return null;
  }
};

module.exports = authRepository;

