const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'algoinsight_secret_key_mca_project';

// In-Memory User Store fallback when MongoDB is offline
const inMemoryUsers = new Map();

// Helper to check DB connection
const isDbConnected = () => mongoose.connection.readyState === 1;

// Auth middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (isDbConnected()) {
      const user = await User.findById(decoded.userId).select('-password');
      if (user) {
        req.user = user;
        req.token = token;
        return next();
      }
    }

    // Fallback to in-memory store
    const memUser = Array.from(inMemoryUsers.values()).find(u => u.id === decoded.userId);
    if (memUser) {
      req.user = memUser;
      req.token = token;
      return next();
    }

    return res.status(401).json({ message: 'User not found, authentication failed.' });
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Token is invalid or expired, authorization denied.' });
  }
};

// 1. Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1A. If Database is connected
    if (isDbConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        completions: {},
        highScores: {},
        streak: 0
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id.toString() }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({
        token,
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          completions: newUser.completions,
          highScores: newUser.highScores,
          streak: newUser.streak
        }
      });
    }

    // 1B. Fallback if Database is offline / not connected
    console.warn('MongoDB offline. Using in-memory fallback for signup.');

    if (inMemoryUsers.has(normalizedEmail)) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const newUserObj = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      completions: {},
      highScores: {},
      streak: 0
    };

    inMemoryUsers.set(normalizedEmail, newUserObj);

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUserObj.id,
        name: newUserObj.name,
        email: newUserObj.email,
        completions: newUserObj.completions,
        highScores: newUserObj.highScores,
        streak: newUserObj.streak
      }
    });

  } catch (error) {
    console.error('Signup Error Detail:', error);
    res.status(500).json({ message: error.message || 'Server error during signup.' });
  }
});

// 2. Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2A. Database Mode
    if (isDbConnected()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials. User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
      }

      const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });

      return res.json({
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          completions: user.completions,
          highScores: user.highScores,
          streak: user.streak
        }
      });
    }

    // 2B. In-Memory Mode
    const user = inMemoryUsers.get(normalizedEmail);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        completions: user.completions,
        highScores: user.highScores,
        streak: user.streak
      }
    });

  } catch (error) {
    console.error('Login Error Detail:', error);
    res.status(500).json({ message: error.message || 'Server error during login.' });
  }
});

// 3. Profile Route
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

// 4. Progress Sync Route
router.post('/sync-progress', auth, async (req, res) => {
  try {
    const { completions, highScores, streak } = req.body;

    if (isDbConnected() && req.user.save) {
      if (completions) req.user.completions = { ...req.user.completions, ...completions };
      if (highScores) {
        const merged = { ...req.user.highScores };
        Object.keys(highScores).forEach(key => {
          merged[key] = Math.max(merged[key] || 0, highScores[key] || 0);
        });
        req.user.highScores = merged;
      }
      if (typeof streak === 'number') {
        req.user.streak = Math.max(req.user.streak || 0, streak);
      }

      req.user.markModified('completions');
      req.user.markModified('highScores');
      await req.user.save();

      return res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        completions: req.user.completions,
        highScores: req.user.highScores,
        streak: req.user.streak
      });
    }

    // In-memory user sync
    if (completions) req.user.completions = { ...req.user.completions, ...completions };
    if (highScores) {
      const merged = { ...req.user.highScores };
      Object.keys(highScores).forEach(key => {
        merged[key] = Math.max(merged[key] || 0, highScores[key] || 0);
      });
      req.user.highScores = merged;
    }
    if (typeof streak === 'number') {
      req.user.streak = Math.max(req.user.streak || 0, streak);
    }

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      completions: req.user.completions,
      highScores: req.user.highScores,
      streak: req.user.streak
    });

  } catch (error) {
    console.error('Sync Error Detail:', error);
    res.status(500).json({ message: error.message || 'Server error during progress sync.' });
  }
});

module.exports = router;
