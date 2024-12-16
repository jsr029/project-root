const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/uploads', express.static('uploads'));

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((error) => console.log('Not connected to mongoDB', error));

app.use('/api/auth', authRoutes);
app.use('//api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).json({ error: 'Duplicate key error' });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = app;
