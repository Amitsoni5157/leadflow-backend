// Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  property: String,
  status: { type: String, default: 'new' },
  userId: { type: String, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);