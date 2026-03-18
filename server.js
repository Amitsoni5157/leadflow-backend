const express = require('express'); 
const mongoose = require('mongoose'); 
const leadRoutes = require('./routes/leads'); 
const cors = require('cors'); 
const app = express(); 
require('./services/followupService');
require('dotenv').config();
app.use(cors()); 
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/leadflow') .then(() => console.log("DB Connected")); 

app.use('/api/leads', leadRoutes); 
app.listen(5000, () => console.log("Server running on port 5000"));