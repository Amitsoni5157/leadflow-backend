// authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body); // 🔥 DEBUG

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      role: "user" // 🔥 ensure role
    });

    await user.save();

    console.log("USER SAVED:", user); // 🔥 DEBUG

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 🔥 VERY IMPORTANT
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ email, password });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = require('jsonwebtoken').sign(
      {
        userId: user._id,
        role: user.role
      },
      "secretkey"
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};