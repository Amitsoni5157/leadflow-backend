const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });
  await user.save();

  res.json({ message: "User registered" });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role   // 🔥 IMPORTANT
    },
    "secretkey"
  );

  res.json({
    token,
    role: user.role   // 🔥 FRONTEND ke liye
  });
};