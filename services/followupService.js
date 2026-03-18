const cron = require('node-cron');
const Lead = require('../models/Lead');
const sendWhatsApp = require('./whatsappService');

cron.schedule('* * * * *', async () => {
  console.log("Checking follow-ups...");

  const leads = await Lead.find();
  const now = new Date();

  for (let lead of leads) {
    const created = new Date(lead.createdAt);
    const diff = (now - created) / (1000 * 60 * 60 * 24);

    // 🔥 TEST MODE (1 minute approx)
    if (diff > 0.001 && !lead.followup1) {
      console.log("Sending Follow-up 1 to:", lead.phone);

      await sendWhatsApp(
        lead.phone,
        `Hi ${lead.name}, just checking — are you interested?`
      );

      lead.followup1 = true;
      await lead.save();
    }

    if (diff > 0.002 && !lead.followup2) {
      console.log("Sending Follow-up 2 to:", lead.phone);

      await sendWhatsApp(
        lead.phone,
        `Last reminder ${lead.name}! Contact us soon.`
      );

      lead.followup2 = true;
      await lead.save();
    }
  }
});