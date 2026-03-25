const cron = require('node-cron');
const Lead = require('../models/Lead');
const sendWhatsApp = require('./whatsappService');

const TEST_MODE = true; // true = testing | false = production

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

// cron.schedule('0 * * * *', async () => {
//   console.log("Checking follow-ups...");

//   const leads = await Lead.find();
//   const now = new Date();

//   for (let lead of leads) {
//     const created = new Date(lead.createdAt);
//     const diff = (now - created) / (1000 * 60 * 60 * 24);

//     // ✅ After 1 Day
//     if (diff > 1 && !lead.followup1) {
//       console.log("Sending Follow-up 1 to:", lead.phone);

//       await sendWhatsApp(
//         lead.phone,
//         `Hi ${lead.name}, just checking — are you interested?`
//       );

//       lead.followup1 = true;
//       await lead.save();
//     }

//     // ✅ After 2 day
//     if (diff > 2 && !lead.followup2) {
//       console.log("Sending Follow-up 2 to:", lead.phone);

//       await sendWhatsApp(
//         lead.phone,
//         `Last reminder ${lead.name}! Contact us soon.`
//       );

//       lead.followup2 = true;
//       await lead.save();
//     }
//   }
// });