const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const API_KEY = process.env.GEMINI_API_KEY; // Lấy API key từ biến môi trường
    const { prompt } = JSON.parse(event.body);

    // Gửi request đến Gemini API
    const response = await fetch("https://api.gemini.com/generate", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${API_KEY}`, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lỗi khi gọi API Gemini" }),
    };
  }
};
