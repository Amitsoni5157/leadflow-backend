const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Lead = require("../models/Lead");
const auth = require("../middleware/authMiddleware");

// 🔥 GET ANALYTICS
router.get("/", auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({ status: "new" });
    const contactedLeads = await Lead.countDocuments({ status: "contacted" });
    const closedLeads = await Lead.countDocuments({ status: "closed" });

    res.json({
      totalUsers,
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads
    });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;