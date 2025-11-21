import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMeetingAgenda = async (topic: string, durationMinutes: number): Promise<string> => {
  try {
    const ai = getAIClient();
    
    // Using gemini-2.5-flash for speed
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Составь краткую, профессиональную повестку (agenda) для рабочей встречи на тему "${topic}", которая длится ${durationMinutes} минут. Используй маркированный список. Отвечай только на русском языке. Выводи только простой текст, без символов markdown (например, без ** или ##).`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    return response.text || "Не удалось сгенерировать повестку.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ИИ сервис временно недоступен. Пожалуйста, заполните повестку вручную.";
  }
};