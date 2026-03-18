const express = require('express'); 
const mongoose = require('mongoose'); 
const leadRoutes = require('./routes/leads'); 
const cors = require('cors'); 

require('dotenv').config();

const app = express(); 

require('./services/followupService');

app.use(cors()); 
app.use(express.json()); 

// ✅ Correct MongoDB connection
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err));

app.use('/api/leads', leadRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));