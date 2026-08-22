const express = require('express');
const router = express.Router();

// @route   GET /api/health
// @desc    Get API health status
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    message: 'AlgoInsight Backend Server Active',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// @route   GET /api/info
// @desc    Get project meta details
router.get('/info', (req, res) => {
  res.json({
    project: 'AlgoInsight',
    version: '1.0.0',
    description: 'DSA Algorithm Visualization Platform',
    developers: ['Pulkit Mishra', 'Deeksha Garg'],
    course: 'MCA 3rd Semester Project'
  });
});

module.exports = router;
