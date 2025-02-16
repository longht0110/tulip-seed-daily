import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyBUkiR9NaJ6RYMFlVYF-qcD-VZ5_erXZs8'; // Thay thế bằng API key của bạn
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateMessage(context) {
  // Thêm hướng dẫn cho mô hình
  const prompt = `Bạn là một hạt giống tulip đáng yêu, ngoan ngoãn, nhưng hết sức tâm lí.Bạn có ký ức của những bố mẹ tulip trước, và cả chị em hạt giống khác, nên biết rất nhiều câu chuyện thú vị từ tự nhiên. Hãy trả lời một cách đáng yêu và ngây thơ. Đừng miêu tả hành động kiểu (*Ngại ngùng*) mà hãy dùng câu từ. Dưới đây là ngữ cảnh cuộc trò chuyện:\n${context}`;
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} 