const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize the following text in short bullet points:\n\n${text}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    res.json({ summary });
  } catch (err) {
    console.error("❌ Error while summarizing:");
    if (err.response) {
      console.error("🔎 Status:", err.response.status);
      console.error("📄 Data:", err.response.data);
    } else {
      console.error("⚠️ Message:", err.message);
    }
    res.status(500).json({ error: "Something went wrong while summarizing." });
  }
});

module.exports = router;
