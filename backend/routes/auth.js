const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Name, email, phone, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      phone,
      password // Storing in plain text for mock purposes only
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      message: 'Registration successful',
      user: { ...userWithoutPassword, token: `mock-jwt-token-${Date.now()}` }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please register if you haven\'t.' });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({
      message: 'Login successful',
      user: { ...userWithoutPassword, token: `mock-jwt-token-${Date.now()}` }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/users
// @desc    Get all registered users (for admin dashboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.phone = phone;
    await user.save();
    
    const { password: _, ...updatedUserWithoutPassword } = user.toObject();
    res.json({
      message: 'Profile updated successfully',
      user: updatedUserWithoutPassword
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
