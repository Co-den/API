// controllers/geminiController.js
const axios = require('axios');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config({ path: './.env' });

const API_KEY = process.env.API_KEY;

exports.chatWithGemini = async (req, res) => {
  const { prompt } = req.body;

  // Basic validation
  if (!prompt || typeof prompt !== 'string' || validator.isEmpty(prompt.trim())) {
    return res.status(400).json({ message: 'A valid prompt is required.' });
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

    // Defensive response parsing
    const result =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response text received from Gemini.';

    return res.status(200).json({ response: result });
  } catch (error) {
    console.error('Gemini error:', {
      status: error.response?.status || 'N/A',
      data: error.response?.data || error.message,
    });

    return res.status(500).json({
      message: 'Failed to communicate with Gemini.',
      error: error.response?.data || 'Unexpected error occurred.',
    });
  }
};
