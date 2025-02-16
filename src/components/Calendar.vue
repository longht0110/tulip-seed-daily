<template>
  <div class="calendar">
    <h2>📅 {{ currentDate }}</h2>
    <div class="button-container">
      <button @click="prevMonth" class="nav-button">&#9664;</button>
      <button @click="resetToToday" class="nav-button">Hôm nay</button>
      <button @click="nextMonth" class="nav-button">&#9654;</button>
    </div>
    <div class="calendar-grid">
      <div class="day" v-for="day in days" :key="day">{{ day }}</div>
      <div class="date" 
           v-for="date in dates" 
           :key="date" 
           :class="{ 
             'current-day': isCurrentDay(date),
             'seeded-day': isSeededDay(date)
           }"
           @click="showMessage(date)">
        {{ date }}
        <span v-if="isSeededDay(date)" class="tulip-icon">🌷</span>
      </div>
    </div>

    <!-- Hộp thoại hiển thị message -->
    <div v-if="selectedMessage" class="overlay" @click.self="closeMessage">
      <div class="message-popup">
        <button class="close-button" @click="closeMessage">
          <span class="material-icons">X</span>
        </button>
        <div class="message-content">
          <p v-html="formattedMessage"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",
      days: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dates: [],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      seededDays: JSON.parse(localStorage.getItem('seededDays')) || {},
      seedMessages: JSON.parse(localStorage.getItem('seedMessages')) || {},
      selectedMessage: null
    };
  },
  computed: {
    formattedMessage() {
      if (!this.selectedMessage) return "";
      let message = this.selectedMessage
        .replace(/(\.\.\.|[.!?])\s/g, "$1<br>")
        .replace(/([.!?])\s/g, "$1<br>") // Xuống dòng sau dấu . ! ?
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Làm đậm nội dung giữa ** **
      return message;
    }
  },
  created() {
    this.updateCurrentDate();
    this.generateDates();
  },
  methods: {
    updateCurrentDate() {
      this.currentDate = new Date(this.currentYear, this.currentMonth).toLocaleDateString("vi-VN", { year: 'numeric', month: 'long' });
    },
    generateDates() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      
      this.dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      // Thêm các ô trống cho các ngày trước
      for (let i = 0; i < firstDay; i++) {
        this.dates.unshift("");
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.updateCurrentDate();
      this.generateDates();
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.updateCurrentDate();
      this.generateDates();
    },
    resetToToday() {
      this.currentMonth = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.updateCurrentDate();
      this.generateDates();
    },
    isCurrentDay(date) {
      return date === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear();
    },
    isSeededDay(date) {
      if (!date) return false;
      const key = `${this.currentYear}-${this.currentMonth + 1}-${date}`;
      return this.seededDays[key];
    },
    showMessage(date) {
      if (!this.isSeededDay(date)) return;
      const key = new Date(this.currentYear, this.currentMonth, date).toLocaleDateString("vi-VN");
      this.selectedMessage = this.seedMessages[key] || "Không tìm thấy thông điệp cho ngày này.";
    },
    closeMessage() {
      this.selectedMessage = null;
    }
  }
};
</script>

<style scoped>
.calendar {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
}
.button-container {
  margin-bottom: 10px;
}
.nav-button {
  padding: 6px 12px;
  margin: 0 5px;
  font-size: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.nav-button:hover {
  background-color: #0056b3;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  height: 300px;
}
.day, .date {
  border: 1px solid #ccc;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  cursor: pointer;
}
.day {
  background-color: #f0f0f0;
  font-weight: bold;
}
.current-day {
  background-color: #FFD700;
  font-weight: bold;
}
.seeded-day {
  background-color: #ffebee;
  position: relative;
}
.seeded-day:hover {
  background-color: #f8bbd0;
}
.tulip-icon {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
}

/* Overlay mờ nền */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* Hộp thoại hiển thị message */
.message-popup {
  position: relative;
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-width: 400px;
  max-height: 80vh;
  text-align: left;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
}
.message-content {
  margin-top: 40px; /* Đảm bảo văn bản không bị che bởi nút đóng */
}
.message-content p {
  line-height: 1.5;
  white-space: pre-line;
}
.close-button {
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: 2px solid #828282;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
}
.close-button:hover {
  color: #fbff00;
}

/* Hiệu ứng chuyển động */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
