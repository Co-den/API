const express = require('express');
const { chatWithGemini } = require('../controllers/aiController');

const router = express.Router();

router.post('/chat/gemini', chatWithGemini);

module.exports = router;
