const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String
const MONGO_URI = 'mongodb://localhost:27017/backend';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = 5000; // You can also hardcode the port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));