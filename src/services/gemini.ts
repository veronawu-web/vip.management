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
  avatarPrompt: string;
  traits: string[];
}> {
  const ai = getAI();
  const prompt = `
    Analyze the following VIP customer's conversation snippets and existing traits to create a deeper personality profile and a visual description for a 3D avatar.
    
    Customer Name: ${user.name}
    Current Traits: ${user.personalityTraits.join(', ')}
    Conversations:
    ${user.conversationSnippets.map(s => `- "${s}"`).join('\n')}
    
    Return a JSON object with:
    1. personalitySummary: A 2-sentence professional summary of their communication style and values.
    2. avatarPrompt: A detailed prompt for an image generator to create a 3D character avatar. The style MUST be "3D stylized vinyl toy character, high-quality 3D render, clay-like texture, rounded and smooth features, large expressive eyes, clean studio lighting, solid neutral light gray background". The character should be a bust-up portrait. Include specific accessories (like a colorful beanie, a hoodie, a baseball cap, or thick-rimmed glasses) that match their personality. The overall vibe is modern, playful, and high-end 3D digital art, similar to designer toy collections.
    3. traits: 3-5 refined personality keywords.
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
          avatarPrompt: { type: Type.STRING },
          traits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["personalitySummary", "avatarPrompt", "traits"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function generateVIPAvatar(prompt: string): Promise<string> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
  
  throw new Error("No image generated");
}
