import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024"
    });
    const imageUrl = response.data[0]?.url;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to generate image." });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
