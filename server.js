const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./middleware/auth').authenticateToken, require('./routes/users'));
app.use('/api/categories', require('./middleware/auth').authenticateToken, require('./routes/categories'));
app.use('/api/products', require('./middleware/auth').authenticateToken, require('./routes/products'));
app.use('/api/orders', require('./middleware/auth').authenticateToken, require('./routes/orders'));
app.use('/api/dashboard', require('./middleware/auth').authenticateToken, require('./routes/dashboard'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food_delivery_db';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

