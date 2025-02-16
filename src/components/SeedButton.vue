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
      const prompt = "Hãy tạo một thông điệp truyền cảm hứng hôm nay, ngắn gọn, sâu sắc với hình ảnh hoa tulip làm biểu tượng của sự phát triển, hy vọng hoặc một khía cạnh ý nghĩa trong cuộc sống. Thông điệp phải mang lại động lực và tinh thần lạc quan cho người đọc, kèm theo một lời nhắc nhở nhẹ nhàng nhằm giúp họ suy ngẫm hoặc chú ý hơn trong hành trình của mình. Nội dung cần được trình bày dưới dạng một phiên bản duy nhất, không kèm theo các lựa chọn thay thế, ghi chú hoặc phiên bản khác. Thể hiện thông điệp theo phong cách ngắn gọn, đáng yêu, giàu chất thơ và cảm xúc, sử dụng icon dễ thương một cách linh hoạt để tạo sự sinh động.";
      
      this.isSeeded = true;
      const message = await generateMessage(prompt);
      this.$emit('onSeed', message);

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

      // Đợi 1 giây để đảm bảo message được lưu rồi mới refresh
      setTimeout(() => {
        location.reload();
      }, 999);
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
