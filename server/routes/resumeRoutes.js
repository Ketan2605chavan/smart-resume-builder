const express = require('express');
const router = express.Router();
const { generateSuggestion } = require('../controllers/resumeController');

// Matches POST http://localhost:5000/api/resume/suggest
router.post('/suggest', generateSuggestion);

module.exports = router;
