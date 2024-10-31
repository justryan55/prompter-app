<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import DailyPrompt from '@/components/DailyPrompt.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    NavigationBar,
    DailyPrompt
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">Home</p>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <DailyPrompt />
    <NavigationBar />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.fixed {
  position: sticky;
  background-color: #222222;
  top: 0;
}

.header-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  color: white;
  font-size: 2rem;
  font-weight: 700;
}
</style>
