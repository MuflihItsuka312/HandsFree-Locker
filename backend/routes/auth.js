const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password, role: 'owner' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    console.log('Login successful for user:', user.username);
    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
});

// add user from app internal
router.post('/add', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password, role: 'user' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;