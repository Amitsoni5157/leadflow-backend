const cron = require('node-cron');
const Lead = require('../models/Lead');
const sendWhatsApp = require('./whatsappService');

const TEST_MODE = false; // true = testing | false = production

const SCHEDULE = TEST_MODE ? '*/2 * * * *' : '0 * * * *';

cron.schedule(SCHEDULE, async () => {
  console.log("Checking follow-ups...");

  const now = new Date();

  const leads = await Lead.find();

  for (let lead of leads) {

    // 🔥 FORCE TESTING (IMPORTANT)
    if (TEST_MODE) {
      lead.nextFollowUp = new Date(now.getTime() - 60000); // past me set
    }

    // ❌ Skip if not due
    if (lead.nextFollowUp && lead.nextFollowUp > now) {
      continue;
    }

    let message = "";

    if (lead.followUpCount === 0) {
      message = `Hi ${lead.name}, just checking — are you interested?`;
    } 
    else if (lead.followUpCount === 1) {
      message = `Reminder ${lead.name}! Let us know your interest.`;
    } 
    else {
      message = `Last follow-up ${lead.name}, contact us soon.`;
    }

    console.log("Sending message to:", lead.phone);

    await sendWhatsApp(lead.phone, message);

// 🔥 SAVE HISTORY (✔ CORRECT PLACE)
lead.followUpHistory.push({
  message: message
});

    // 🔄 update follow-up
    lead.followUpCount = (lead.followUpCount || 0) + 1;

    const nextDate = new Date();

    if (TEST_MODE) {
      nextDate.setMinutes(nextDate.getMinutes() + 2);
    } else {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    lead.nextFollowUp = nextDate;

    await lead.save();
  }
});