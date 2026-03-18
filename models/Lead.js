const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  property: String,
  status: { type: String, default: 'new' },

  // 🔥 FOLLOW-UP TRACKING
  followup1: { type: Boolean, default: false },
  followup2: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);