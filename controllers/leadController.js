const Lead = require('../models/Lead');
const sendWhatsApp = require('../services/whatsappService');

exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();

    // WhatsApp message send
    await sendWhatsApp(lead.phone, `Hi ${lead.name}, thanks for your interest!`);

    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Lead.findByIdAndUpdate(id, { status });
  res.json({ success: true });
};