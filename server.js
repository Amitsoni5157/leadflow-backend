const express = require('express'); 
const mongoose = require('mongoose'); 
const leadRoutes = require('./routes/leads'); 
const cors = require('cors'); 
const app = express(); 
require('./services/followupService');
require('dotenv').config();
app.use(cors()); 
app.use(express.json()); 

mongoose.connect('process.env.MONGO_URI') .then(() => console.log("DB Connected")); 

app.use('/api/leads', leadRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));