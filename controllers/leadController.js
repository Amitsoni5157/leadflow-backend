const Lead = require('../models/Lead');
const sendWhatsApp = require('../services/whatsappService');

// ✅ CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
      userId: req.user.userId   // 🔥 JWT se userId
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

// ✅ GET LEADS (ONLY LOGGED USER)
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
        userId: req.user.id   // 🔥 JWT se filter
    }).sort({ createdAt: -1 });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Lead.findByIdAndUpdate(id, { status });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};