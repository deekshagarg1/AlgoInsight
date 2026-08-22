const mongoose = require('mongoose');

// Sub-schema representing an individual line in the code panel
const CodeLineSchema = new mongoose.Schema({
  num: { 
    type: Number, 
    required: true 
  },
  text: { 
    type: String, 
    default: '' // Can be empty for spacing lines
  },
  type: { 
    type: String, 
    required: true,
    enum: ['declaration', 'normal', 'loop', 'compare', 'swap', 'control', 'comment'] // Standard categories matching UI highlights
  }
}, { _id: false }); // Disable _id generation for array items to save database space

// Main Algorithm Schema holding different programming language snippets
const AlgorithmSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true, // E.g., 'bubble-sort', 'selection-sort'
    trim: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  code: {
    java: [CodeLineSchema],
    cpp: [CodeLineSchema],
    python: [CodeLineSchema]
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt tracking
});

module.exports = mongoose.model('Algorithm', AlgorithmSchema);
