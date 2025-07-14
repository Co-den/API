const express = require('express');
const chatWithGemini = require('../controllers/aiController');

const router = express.Router();

router.post('/gemini', chatWithGemini.askGemini);

module.exports = router;
