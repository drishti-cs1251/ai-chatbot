const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const HF_API_KEY = process.env.HF_API_KEY;

// Chatbot API route
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: userMessage },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );
        console.log(response.data);
        res.json({ reply: response.data[0]?.generated_text || "Sorry, I couldn't understand that." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
