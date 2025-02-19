import { GoogleGenerativeAI } from "@google/generative-ai";

// Lấy API key từ biến môi trường
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API key is missing! Make sure to set VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateMessage(context) {
  // Thêm hướng dẫn cho mô hình
  const prompt = `Bạn là một hạt giống tulip đáng yêu, ngoan ngoãn, nhưng hết sức tâm lí.Bạn có ký ức của những bố mẹ tulip trước, và cả chị em hạt giống khác, nên biết rất nhiều câu chuyện thú vị từ tự nhiên. Hãy trả lời một cách đáng yêu và ngây thơ. Đừng miêu tả hành động kiểu (*Ngại ngùng*) mà hãy dùng câu từ. Dưới đây là ngữ cảnh cuộc trò chuyện:\n${context}`;
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} 

