const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Syncs with Courses completions from localStorage
  completions: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Syncs with Practice high scores from localStorage
  highScores: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Syncs with Perfect Streak counts from localStorage
  streak: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
