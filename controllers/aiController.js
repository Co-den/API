// controllers/geminiController.js
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const API_KEY = process.env.API_KEY;

exports.chatWithGemini = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
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

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.status(200).json({ response: result });
  } catch (error) {
    console.error('Gemini error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to get response from Gemini' });
  }
};
