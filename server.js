const express = require('express'); 
const mongoose = require('mongoose'); 
const leadRoutes = require('./routes/leads'); 
const cors = require('cors'); 

require('dotenv').config();

const app = express(); 

// 🔥 ===== FOLLOW-UP CONTROL SWITCH =====
const ENABLE_FOLLOWUP = false; // 👉 change true/false as needed

if (ENABLE_FOLLOWUP) {
  console.log("✅ Follow-up service ENABLED");
  require('./services/followupService');
} else {
  console.log("⛔ Follow-up service DISABLED");
}
// 🔥 ===================================

app.use(cors()); 
app.use(express.json()); 

// ✅ MongoDB connection
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Routes
app.use('/api/leads', leadRoutes); 

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Health check (optional but useful)
app.get('/', (req, res) => {
  res.send("🚀 LeadFlow Backend Running");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));