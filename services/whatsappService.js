const twilio = require('twilio');

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

const sendWhatsApp = async (phone, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+91${phone}`
    });

    console.log("WhatsApp Sent:", response.sid);
  } catch (error) {
    console.error("WhatsApp Error:", error.message);
  }
};

module.exports = sendWhatsApp;