// Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  property: String,

  status: { 
    type: String, 
    default: 'new' 
  },

  userId: { 
    type: String, 
    required: true 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  // 🔥 NEW FIELDS (ADD THESE)
  nextFollowUp: {
    type: Date,
    default: function () {
      const next = new Date();
      next.setDate(next.getDate() + 1); // +1 day
      return next;
    }
  },

  followUpCount: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('Lead', leadSchema);