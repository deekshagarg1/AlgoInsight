const express = require('express');
const router = express.Router();
const Algorithm = require('../models/Algorithm');

// @route   GET /api/algorithms
// @desc    Retrieve all algorithms in the database (simple listing)
router.get('/', async (req, res) => {
  try {
    const algorithms = await Algorithm.find({}, 'id name'); // Only fetch the id and name fields for listing
    res.json(algorithms);
  } catch (err) {
    console.error(`Error retrieving algorithms: ${err.message}`);
    res.status(500).json({ error: 'Server Error: Could not fetch algorithms listing.' });
  }
});

// @route   GET /api/algorithms/:id
// @desc    Retrieve detailed information and code mappings for a specific algorithm ID
router.get('/:id', async (req, res) => {
  try {
    const algorithm = await Algorithm.findOne({ id: req.params.id });
    
    if (!algorithm) {
      return res.status(404).json({ error: `Algorithm with ID '${req.params.id}' not found.` });
    }

    res.json(algorithm);
  } catch (err) {
    console.error(`Error retrieving algorithm details: ${err.message}`);
    res.status(500).json({ error: 'Server Error: Could not fetch algorithm details.' });
  }
});

module.exports = router;
