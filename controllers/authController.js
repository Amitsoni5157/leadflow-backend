const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // 🔥 TOKEN GENERATE
  const token = jwt.sign(
    { userId: user._id },
    "secretkey",   // later env me daalenge
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login success",
    token,
    user
  });
};