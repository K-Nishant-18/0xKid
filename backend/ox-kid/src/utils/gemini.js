import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateGeminiResponse = async (prompt) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-1.5-pro"
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return "⚠️ No response generated from Gemini.";
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return "⚠️ Gemini API failed to generate a response.";
  }
};
