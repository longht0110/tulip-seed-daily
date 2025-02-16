<template>
  <div class="home">
    <Calendar ref="calendarRef" />
    <SeedButton @onSeed="handleSeed" />
    <MessageCard v-if="message" :message="message" />
    
    <!-- Thêm nút xóa dữ liệu -->
    <button 
      v-if="isDevelopment" 
      @click="clearLocalData" 
      class="debug-button"
    >
      🗑️ Xóa dữ liệu (Debug)
    </button>
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue';
import SeedButton from '../components/SeedButton.vue';
import MessageCard from '../components/MessageCard.vue';

export default {
  components: { Calendar, SeedButton, MessageCard },
  data() {
    return { 
      message: null,
      isDevelopment: import.meta.env.DEV
    };
  },
  methods: {
    handleSeed(seedMessage) {
      this.message = seedMessage;
    },
    clearLocalData() {
      if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu?')) {
        localStorage.removeItem('seedMessages');
        localStorage.removeItem('seededDays');
        location.reload();
      }
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.debug-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.debug-button:hover {
  background-color: #c82333;
}
</style>
