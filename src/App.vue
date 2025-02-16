<template>
  <div class="app">
    <header>
      <h1>🌷Tulip Seed Daily🌷</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
  font-family: 'Arial', sans-serif;
  background: #fef8e6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #ffcc80;
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
}
</style>
