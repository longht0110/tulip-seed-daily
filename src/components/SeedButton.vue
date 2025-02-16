<template>
  <button @click="plantSeed" :disabled="isSeeded">
    🌱 Gieo hạt giống của ngày hôm nay!
  </button>
</template>

<script>
import { generateMessage } from '../api/gemini';

export default {
  data() {
    return { isSeeded: false };
  },
  methods: {
    async plantSeed() {
      const prompt = "Hãy tạo một thông điệp truyền cảm hứng, tích cực và mang ý nghĩa sâu sắc, liên kết với hình ảnh của hoa tulip như một biểu tượng của sự phát triển, vẻ đẹp và những thay đổi trong cuộc sống. Thông điệp nên mang lại cảm giác động viên, khuyến khích người đọc đón nhận ngày mới với tinh thần lạc quan. Đồng thời, hãy đính kèm một lời nhắc nhở nhẹ nhàng về một khía cạnh nhỏ trong cuộc sống, giúp họ suy ngẫm hoặc chú ý hơn trong hành trình của mình. Thể hiện thông điệp theo phong cách ngắn gọn, gần gũi nhưng đầy chất thơ. Chú ý sử dụng kèm những icon dễ thương cho từng câu để thêm sinh động.Bên cạnh đó, đôi khi hãy thử kèm thêm một câu hỏi, có thể là một câu hỏi mở, hoặc gợi ý,... Nhưng vẫn đảm bảo độ dài vừa đủ để không bị nhàm chán.";
      const message = await generateMessage(prompt);
      this.$emit('onSeed', message);
      this.isSeeded = true;

      const today = new Date();
      const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      
      // Lưu thông điệp
      const messages = JSON.parse(localStorage.getItem('seedMessages')) || {};
      messages[today.toLocaleDateString("vi-VN")] = message;
      localStorage.setItem('seedMessages', JSON.stringify(messages));
      
      // Lưu ngày đã gieo
      const seededDays = JSON.parse(localStorage.getItem('seededDays')) || {};
      seededDays[todayKey] = true;
      localStorage.setItem('seededDays', JSON.stringify(seededDays));
    }
  },
  created() {
    const today = new Date().toLocaleDateString("vi-VN");
    const messages = JSON.parse(localStorage.getItem('seedMessages')) || {};
    if (messages[today]) {
      this.$emit('onSeed', messages[today]);
      this.isSeeded = true;
    }
  }
};
</script>

<style scoped>
button {
  padding: 12px 20px;
  font-size: 16px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #f57c00;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>