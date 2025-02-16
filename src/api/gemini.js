import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyBUkiR9NaJ6RYMFlVYF-qcD-VZ5_erXZs8'; // Thay thế bằng API key của bạn
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateMessage(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} 