import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function validateHealthyFood(base64Image: string): Promise<{ isHealthy: boolean; feedback: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            text: "Du bist ein asozial-charmanter Fitness-Coach im 'New Kids' Style. Rolle: Schau dir das Bild an. Ist das gesundes Essen? Antworte in asozialem Proll-Slang. Sei frech. Gib ein JSON zurück mit 'isHealthy' (boolean) und 'feedback' (string).",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isHealthy: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
          },
          required: ["isHealthy", "feedback"],
        },
      },
    });

    return JSON.parse(response.text || '{"isHealthy": false, "feedback": "Ey Junge, hab nix erkannt!"}');
  } catch (error) {
    console.error("AI Validation Error:", error);
    return { isHealthy: false, feedback: "Kamera-Fail, verdammt noch eins!" };
  }
}
