const express = require('express');
const router = express.Router();

// GET /api — API info
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: {
      'GET /api': 'API info',
      'GET /api/health': 'Health check',
    },
  });
});

// GET /api/health — Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
