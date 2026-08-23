const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'algoinsight_secret_key_mca_project';

// Auth middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found, authentication failed.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or expired, authorization denied.' });
  }
};

// 1. Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      completions: {},
      highScores: {},
      streak: 0
    });

    await newUser.save();

    // Sign Token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        completions: newUser.completions,
        highScores: newUser.highScores,
        streak: newUser.streak
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// 2. Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User does not exist.' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // Sign Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        completions: user.completions,
        highScores: user.highScores,
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// 3. Profile Route (Fetch current user)
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

// 4. Progress Sync Route (Upload localStorage data)
router.post('/sync-progress', auth, async (req, res) => {
  try {
    const { completions, highScores, streak } = req.body;

    // Merge or overwrite user progress fields
    if (completions) req.user.completions = { ...req.user.completions, ...completions };
    if (highScores) {
      // For high scores, we preserve the highest values
      const mergedScores = { ...req.user.highScores };
      Object.keys(highScores).forEach(key => {
        mergedScores[key] = Math.max(mergedScores[key] || 0, highScores[key] || 0);
      });
      req.user.highScores = mergedScores;
    }
    if (typeof streak === 'number') {
      req.user.streak = Math.max(req.user.streak || 0, streak);
    }

    // Tell Mongoose that Mixed type fields have been modified
    req.user.markModified('completions');
    req.user.markModified('highScores');

    await req.user.save();

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      completions: req.user.completions,
      highScores: req.user.highScores,
      streak: req.user.streak
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during progress synchronization.' });
  }
});

module.exports = router;
