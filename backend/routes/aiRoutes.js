const express = require("express");
const { GoogleGenAI } = require("@google/genai");


const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/generate", async (req, res) => {

    const { topic } = req.body;

    const prompt = `
Generate clear, natural, and well-written text based on the user's request below.

User request:
${topic}

Instructions:
- Understand the user's intent before writing.
- Give a direct and useful response.
- Use simple and natural language.
- Organize the response clearly.
- Do not add unnecessary information.
- Do not mention that you are an AI.
- Follow the user's requested style, tone, and length if specified.
`;

    const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt
    });

    const generatedText = response.output_text;

    res.json({
        success: true,
        generatedText: generatedText
    });

});

module.exports = router;