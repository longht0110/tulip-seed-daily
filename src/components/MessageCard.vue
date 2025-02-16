<template>
  <div class="message-card">
    <p>/🌷🌷🌷🌷🌷🌷🌷/<br> <span v-html="formattedMessage"></span></p>
    <div class="chat-window">
      <div v-for="(msg, index) in chatMessages" :key="index" class="chat-message">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Chị muốn nhắn gì tới em hong?..." />
  </div>
</template>

<script>
import { generateMessage } from '../api/gemini';

export default {
  props: ['message'],
  data() {
    return {
      chatMessages: [],
      newMessage: ''
    };
  },
  computed: {
    formattedMessage() {
      // Chuyển đổi các đoạn giữa * thành thẻ <strong> cho in đậm
      let formatted = this.message
        .replace(/(\.\.\.|[.!?])\s/g, "$1<br>")
        .replace(/([.!?])\s/g, "$1<br>") // Xuống dòng sau dấu . ! ?
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Làm đậm nội dung giữa ** **
      return formatted;
    }
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.chatMessages.push({ sender: 'Bạn', text: this.newMessage });
        
        // Tạo context từ thông điệp ban đầu và đoạn hội thoại hiện tại
        const context = this.message + '\n' + this.chatMessages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
        
        // Gọi API với context
        const response = await generateMessage(context);
        this.chatMessages.push({ sender: 'Hạt giống', text: response });
        
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.message-card {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  padding: 10px;
  background: #ffe0b2;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  max-height: 400px; /* Tăng chiều cao tối đa của message card */
  overflow-y: auto; /* Thêm thanh cuộn dọc */
}

/* Tùy chỉnh thanh cuộn cho đẹp hơn */
.message-card::-webkit-scrollbar {
  width: 8px;
}

.message-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.message-card::-webkit-scrollbar-thumb {
  background: #ffc107;
  border-radius: 4px;
}

.message-card::-webkit-scrollbar-thumb:hover {
  background: #ffb300;
}

.chat-window {
  margin-top: 10px;
  max-height: 150px;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.chat-message {
  margin-bottom: 5px;
}

input {
  width: 80%; /* Giảm chiều ngang của ô nhập văn bản */
  padding: 5px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
