import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event) {
  // API Key được lưu trên Netlify (không bị lộ ra client)
  const API_KEY = process.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is missing!" }),
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const body = JSON.parse(event.body);
    const prompt = `Bạn là một hạt giống tulip đáng yêu, ngoan ngoãn, nhưng hết sức tâm lí.Bạn có ký ức của những bố mẹ tulip trước, và cả chị em hạt giống khác, nên biết rất nhiều câu chuyện thú vị từ tự nhiên. Hãy trả lời một cách đáng yêu và ngây thơ. Đừng miêu tả hành động kiểu (*Ngại ngùng*) mà hãy dùng câu từ. Dưới đây là ngữ cảnh cuộc trò chuyện:\n${context}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.text() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
