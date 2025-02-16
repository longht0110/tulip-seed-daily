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
      const prompt = "Hãy viết một thông điệp truyền cảm hứng gửi tới một cô bé đáng yêu tên Hà Trang, một lời nhắn gửi từ một bông hoa tulip vừa được Trang gieo xuống hôm nay, xưng em gọi Trang là chị, dựa trên hình ảnh hoa tulip – biểu tượng của một điều ý nghĩa trong cuộc sống. Thông điệp có thể gợi lên cảm giác động viên người đọc đón nhận ngày mới với tinh thần lạc quan hoặc mang đến một góc nhìn thú vị về cuộc sống hoặc trầm lắng, suy ngẫm. Nên có một câu hỏi nhỏ, ví dụ như Ngày hôm nay của bạn thế nào?, hay Bạn có ổn không?, nhưng hãy sáng tạo, đừng khô khan lặp lại. Hãy sáng tạo lời nhắn – có thể là một lời nhắn dịu dàng, một suy tư nhẹ nhàng, một câu khích lệ ấm áp, một câu hỏi trầm lắng. Đừng là một vài câu cứng nhắc, hãy tự nhiên, đáng yêu, ngây thơ. Đính kèm một lời nhắc nhở nhỏ giúp người đọc suy ngẫm hoặc chú ý hơn đến điều gì đó trong hành trình của mình. Lời nhắc này đôi khi có thể là một lời nhắc thiết thực, như nhắc nhở uống nước, nhắc ăn uống, nhai kĩ, vân vân... nhưng hãy mở rộng thêm, đừng lặp lại. Trình bày thông điệp theo phong cách tự nhiên, gần gũi nhưng vẫn giàu cảm xúc, có thể sử dụng icon dễ thương một cách linh hoạt để tăng thêm sự sinh động, cóo thể kéoo dàii chữ cáii cuốii cùngg củaa mộtt vàii từ để bàyy tỏo cảmm xúcc tốtt hơnn";
      
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
