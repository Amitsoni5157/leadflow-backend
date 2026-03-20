const cron = require('node-cron');
const Lead = require('../models/Lead');
const sendWhatsApp = require('./whatsappService');

//  every 1 hour run
cron.schedule('0 * * * *', async () => {
  console.log("Checking follow-ups...");

  const leads = await Lead.find();
  const now = new Date();

  for (let lead of leads) {
    const created = new Date(lead.createdAt);
    const diff = (now - created) / (1000 * 60 * 60 * 24);

    // ✅ After 1 Day
    if (diff > 1 && !lead.followup1) {
      console.log("Sending Follow-up 1 to:", lead.phone);

      await sendWhatsApp(
        lead.phone,
        `Hi ${lead.name}, just checking — are you interested?`
      );

      lead.followup1 = true;
      await lead.save();
    }

    // ✅ After 2 day
    if (diff > 2 && !lead.followup2) {
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