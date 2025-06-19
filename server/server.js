require('dotenv').config();
console.log("✅ server.js is running...");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/resume', resumeRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
