// backend/src/app.js
const express = require('express');
const cors = require('cors');

const authenRoutes = require('../routes/authen');
const productRoutes = require('../routes/products');
const ratingRoutes = require('../routes/ratings');
const userRoutes = require('../routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Mounting
app.use('/authen', authenRoutes);
app.use('/products', productRoutes);
app.use('/ratings', ratingRoutes);
app.use('/users', userRoutes);

// Root Health Check
app.get('/', (req, res) => {
  res.send('CH8 Authentication & Product API is running...');
});

// Invalid JSON Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

module.exports = app;
