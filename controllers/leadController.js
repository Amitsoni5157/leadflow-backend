const Lead = require('../models/Lead');
const sendWhatsApp = require('../services/whatsappService');

// ✅ CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
      userId: req.user.userId
    });

    await lead.save();

    // WhatsApp message
    await sendWhatsApp(
      lead.phone,
      `Hi ${lead.name}, thanks for your interest!`
    );

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET LEADS (ROLE BASED)
exports.getLeads = async (req, res) => {
  try {
    let leads;

    if (req.user.role === "admin") {
      // 👑 Admin → sab leads
      leads = await Lead.find().sort({ createdAt: -1 });
    } else {
      // 👤 User → sirf apne leads
      leads = await Lead.find({
        userId: req.user.userId
      }).sort({ createdAt: -1 });
    }

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE STATUS (SECURE)
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let lead;

    if (req.user.role === "admin") {
      // 👑 Admin → kisi ka bhi update
      lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      // 👤 User → sirf apna
      lead = await Lead.findOneAndUpdate(
        { _id: id, userId: req.user.userId },
        { status },
        { new: true }
      );
    }

    if (!lead) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE LEAD (SECURE)
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    let lead;

    if (req.user.role === "admin") {
      // 👑 Admin → delete anyone
      lead = await Lead.findByIdAndDelete(id);
    } else {
      // 👤 User → sirf apna
      lead = await Lead.findOneAndDelete({
        _id: id,
        userId: req.user.userId
      });
    }

    if (!lead) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};