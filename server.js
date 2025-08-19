const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Chatbot API route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        }
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong with Gemini API!" });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
