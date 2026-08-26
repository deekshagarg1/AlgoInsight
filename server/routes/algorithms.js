const express = require('express');
const router = express.Router();
const Algorithm = require('../models/Algorithm');

const FALLBACK_ALGORITHMS = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    description: 'Sort elements by comparing adjacent items and swapping if out of order.',
    complexity: { time: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' }, space: 'O(1)' }
  },
  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    description: 'Partition elements around a chosen pivot and recursively sort partitions.',
    complexity: { time: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)' }, space: 'O(log N)' }
  },
  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    description: 'Halves the search range at every step on sorted arrays via low/mid/high range.',
    complexity: { time: { best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' }, space: 'O(1)' }
  }
};

// @route   GET /api/algorithms
// @desc    Retrieve all algorithms listing
router.get('/', async (req, res) => {
  try {
    const algorithms = await Algorithm.find({}, 'id name');
    if (algorithms && algorithms.length > 0) {
      return res.json(algorithms);
    }
  } catch (err) {
    console.warn(`Database offline, returning fallback algorithm list.`);
  }

  const fallbackList = Object.values(FALLBACK_ALGORITHMS).map(a => ({ id: a.id, name: a.name }));
  res.json(fallbackList);
});

// @route   GET /api/algorithms/:id
// @desc    Retrieve detailed information for specific algorithm ID
router.get('/:id', async (req, res) => {
  try {
    const algorithm = await Algorithm.findOne({ id: req.params.id });
    if (algorithm) {
      return res.json(algorithm);
    }
  } catch (err) {
    console.warn(`Database lookup failed for ${req.params.id}, using fallback.`);
  }

  const fallback = FALLBACK_ALGORITHMS[req.params.id];
  if (fallback) {
    return res.json(fallback);
  }

  res.status(404).json({ error: `Algorithm with ID '${req.params.id}' not found.` });
});

module.exports = router;
