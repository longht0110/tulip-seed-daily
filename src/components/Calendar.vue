<template>
  <div class="calendar">
    <h2>📅 {{ new Date().toLocaleDateString("vi-VN") }}</h2>
    <div class="button-container">
      <button @click="prevMonth" class="nav-button">&#9664;</button>
      <button @click="resetToToday" class="nav-button">Hôm nay</button>
      <button @click="nextMonth" class="nav-button">&#9654;</button>
    </div>
    <div class="calendar-grid">
      <div class="day" v-for="day in days" :key="day">{{ day }}</div>
      <div class="date" v-for="date in dates" :key="date" 
           :class="{ 
             'current-day': date === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear(),
             'seeded-day': isSeededDay(date)
           }">
        {{ date }}
        <span v-if="isSeededDay(date)" class="tulip-icon">🌷</span>
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
      seededDays: JSON.parse(localStorage.getItem('seededDays')) || {}
    };
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
    isSeededDay(date) {
      if (!date) return false;
      const key = `${this.currentYear}-${this.currentMonth + 1}-${date}`;
      return this.seededDays[key];
    },
    refresh() {
      this.seededDays = JSON.parse(localStorage.getItem('seededDays')) || {};
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

.tulip-icon {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
}
</style>
