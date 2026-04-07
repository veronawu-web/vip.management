import { GoogleGenAI, Type } from "@google/genai";
import { VIPUser } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'undefined') {
      throw new Error("GEMINI_API_KEY is missing. Please set it in your environment or GitHub Secrets.");
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
    2. avatarPrompt: A detailed prompt for an image generator to create a 3D character avatar. The subject is a male aged between 30-55 years old (an "uncle" or "big brother" figure). The style should be "high-quality 3D clay-like character, rounded features but with mature facial characteristics (like subtle stubble, glasses, or refined hairstyles), expressive, vibrant colors, clean studio lighting, solid pastel background, high quality 3D render". Include specific clothing (like a polo shirt, a casual blazer, or a tech vest) or accessories (like a high-end watch, a camera, or a coffee cup) that match their personality and age.
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
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
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
  
  throw new Error("No image generated");
}
