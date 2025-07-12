// controllers/chatController.js
const axios = require('axios');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config();
const API_KEY = process.env.API_KEY;

exports.askGemini = async (req, res) => {
  const { prompt } = req.body;

  // Validate input
  if (!prompt || typeof prompt !== 'string' || validator.isEmpty(prompt.trim())) {
    return res.status(400).json({ message: 'Please provide a valid prompt.' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY,
        },
      }
    );

    const reply =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No meaningful reply received.';

    res.status(200).json({ response: reply });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Gemini service error.',
      error: error.response?.data || 'Unknown error.',
    });
  }
};
