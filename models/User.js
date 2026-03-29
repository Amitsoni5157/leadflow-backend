// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["admin", "agent"],
    default: "agent"
  }
});

module.exports = mongoose.model('agent', userSchema);