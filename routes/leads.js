const express = require('express');
const router = express.Router();

const Lead = require('../models/Lead'); // ✅ IMPORTANT

const { 
  getLeads, 
  createLead, 
  updateLead, 
  deleteLead 
} = require('../controllers/leadController');

const authMiddleware = require('../middleware/authMiddleware');

// 📥 GET ALL
router.get('/', authMiddleware, getLeads);

// ➕ CREATE
router.post('/', authMiddleware, createLead);

// 🔄 UPDATE STATUS
router.put('/:id', authMiddleware, updateLead);

// ❌ DELETE
router.delete('/:id', authMiddleware, deleteLead);

// 🔥 MANUAL FOLLOW-UP API
router.put('/:id/followup', authMiddleware, async (req, res) => {
  try {
    const { nextFollowUp } = req.body;

    if (!nextFollowUp) {
      return res.status(400).json({ message: "Date required" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.nextFollowUp = new Date(nextFollowUp);

    lead.followUpHistory.push({
      message: "Manual follow-up scheduled"
    });

    // 👉 optional reset
    lead.followUpCount = 0;

    await lead.save();

    res.json({ message: "Follow-up updated ✅" });

  } catch (err) {
    console.error("Follow-up error:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// 🌐 PUBLIC WEBSITE LEAD (NO AUTH)
router.post('/public-lead', async (req, res) => {
  try {
    const { name, phone, property, userId } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name & Phone required" });
    }

    const lead = await Lead.create({
      name,
      phone,
      property: property || "Website Lead",
      userId: userId || "AUTO",
      nextFollowUp: new Date(),
      followUpCount: 0,
      followUpHistory: [
        {
          message: "Lead captured from Website"
        }
      ]
    });

    // 🔥 WhatsApp trigger
    await sendWhatsApp(
      lead.phone,
      `🔥 New Lead

Name: ${lead.name}
Phone: ${lead.phone}
Property: ${lead.property}

Source: Website`
    );

    console.log("🌐 Lead Added:", userId);

    res.json({ success: true });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;