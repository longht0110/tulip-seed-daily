<template>
  <div class="message-card">
    <p>/🌷🌷🌷🌷🌷🌷🌷/<br> <span v-html="formattedMessage"></span></p>
  </div>
</template>

<script>
export default {
  props: ['message'],
  computed: {
    formattedMessage() {
      // Chuyển đổi các đoạn giữa * thành thẻ <strong> cho in đậm
      let formatted = this.message
        .replace(/(\.\.\.|[.!?])\s/g, "$1<br>")
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      // Chèn xuống dòng sau mỗi dấu chấm
      formatted = formatted.replace(/\./g, '.<br>');
      formatted = formatted.replace(/\!/g, '.<br>');
      formatted = formatted.replace(/\?/g, '.<br>');
      return formatted;
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
}
</style>
