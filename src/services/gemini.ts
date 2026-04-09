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
    請分析以下 VIP 客戶的數據，建立深度的性格檔案、分析評分，以及他們喜愛的主播總結。
    
    客戶姓名: ${user.name}
    目前特質: ${user.personalityTraits.join(', ')}
    對話紀錄:
    ${user.conversationSnippets.map(s => `- "${s}"`).join('\n')}
    
    請返回一個 JSON 對象，包含：
    1. personalitySummary: 兩句話的專業總結，描述他們的溝通風格和價值觀（請使用繁體中文）。
    2. traits: 3-5 個精煉的性格關鍵詞（請使用繁體中文）。
    3. scores: 一個包含 0 到 100 分數的 JSON 對象：
       - loyalty: 對主播的忠誠度。
       - spending: 高額消費的意願。
       - engagement: 互動與參與程度。
       - emotionality: 受情緒驅動的程度。
       - strategic: 行為的計畫性與計算程度。
    4. favoriteStreamers: 包含 { name, spending, status } 的數組。
       - 從對話中識別他們喜歡或有衝突的主播（status 請使用繁體中文描述，例如「支持中」、「已鬧翻」）。
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
