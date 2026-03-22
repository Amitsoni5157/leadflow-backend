const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/authMiddleware');

// 🔥 GET ALL USERS (ADMIN ONLY)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select('-password');

    const usersWithLeads = await Promise.all(
      users.map(async (u) => {
        const count = await Lead.countDocuments({ userId: u._id });
        return {
          ...u._doc,
          leadCount: count
        };
      })
    );

    res.json(usersWithLeads);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔄 CHANGE ROLE
router.put('/:id/role', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE USER
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;