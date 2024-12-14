const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://project-root-frontend.vercel.app'
}));
app.use(express.json());
/** Premier middleware et sera appliqué à toutes les routes, middleware général */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((error) => console.log('Not connected to mongoDB', error));

// General error handling middleware for handling duplicate key errors
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).json({ error: 'Duplicate key error' });
  } else {
    next(err);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
