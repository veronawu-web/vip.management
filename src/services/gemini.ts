import { GoogleGenAI, Type } from "@google/genai";
import { VIPUser } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    // Rely on process.env.GEMINI_API_KEY which is defined in vite.config.ts
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      console.error("API Key Check Failed. process.env.GEMINI_API_KEY is empty.");
      throw new Error("GEMINI_API_KEY is missing. Please ensure you have added it to GitHub Secrets.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function analyzeVIPPersonality(user: VIPUser): Promise<{
  personalitySummary: string;
  traits: string[];
  scores: {
    loyalty: number;
    spending: number;
    engagement: number;
    emotionality: number;
    strategic: number;
  };
  favoriteStreamers?: { name: string; spending: number; status?: string }[];
}> {
  const ai = getAI();
  const prompt = `
    Analyze the following VIP customer's data to create a deeper personality profile, analytical scores, and a summary of their favorite streamers.
    
    Customer Name: ${user.name}
    Current Traits: ${user.personalityTraits.join(', ')}
    Conversations:
    ${user.conversationSnippets.map(s => `- "${s}"`).join('\n')}
    
    Return a JSON object with:
    1. personalitySummary: A 2-sentence professional summary of their communication style and values.
    2. traits: 3-5 refined personality keywords.
    3. scores: A JSON object with scores from 0 to 100 for:
       - loyalty: How devoted they are to the streamer.
       - spending: Their willingness to spend high amounts.
       - engagement: How much they interact and participate.
       - emotionality: How much they are driven by emotions.
       - strategic: How much they plan and calculate their actions.
    4. favoriteStreamers: An array of objects with { name, spending, status }.
       - Identify streamers they like or have conflict with from the conversations.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalitySummary: { type: Type.STRING },
          traits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          scores: {
            type: Type.OBJECT,
            properties: {
              loyalty: { type: Type.NUMBER },
              spending: { type: Type.NUMBER },
              engagement: { type: Type.NUMBER },
              emotionality: { type: Type.NUMBER },
              strategic: { type: Type.NUMBER }
            },
            required: ["loyalty", "spending", "engagement", "emotionality", "strategic"]
          },
          favoriteStreamers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                spending: { type: Type.NUMBER },
                status: { type: Type.STRING }
              },
              required: ["name", "spending"]
            }
          }
        },
        required: ["personalitySummary", "traits", "scores"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

// Remove generateVIPAvatar as it's no longer needed
