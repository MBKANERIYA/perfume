const express = require('express');
const router = express.Router();

// In-memory user store for mock authentication
const users = [];

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'Name, email, phone, and password are required' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    password, // Storing in plain text for mock purposes only
    token: `mock-jwt-token-${Date.now()}`
  };

  users.push(newUser);

  setTimeout(() => {
    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: 'Registration successful',
      user: userWithoutPassword
    });
  }, 500);
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. Please register if you haven\'t.' });
  }

  setTimeout(() => {
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  }, 500);
});

// @route   GET /api/auth/users
// @desc    Get all registered users (for admin dashboard)
router.get('/users', async (req, res) => {
  try {
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
