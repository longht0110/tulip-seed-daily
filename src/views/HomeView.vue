<template>
  <div class="home">
    <Calendar ref="calendarRef" />
    <SeedButton @onSeed="handleSeed" />
    <MessageCard v-if="message" :message="message" />
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue';
import SeedButton from '../components/SeedButton.vue';
import MessageCard from '../components/MessageCard.vue';

export default {
  components: { Calendar, SeedButton, MessageCard },
  data() {
    return { message: null };
  },
  methods: {
    handleSeed(seedMessage) {
      this.message = seedMessage;
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
</style>
