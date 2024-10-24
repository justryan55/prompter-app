<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    NavigationBar
  },

  methods: {
    handleClick() {
      this.$router.push('/home/prompt')
    }
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

    <div class="sub-header-container">
      <p class="sub-header">Daily Prompt</p>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="message-container" @click="handleClick">
      <div class="message-details">
        <p class="prompt-label">Prompt</p>
        <p class="sender">Ryan Irani</p>
      </div>
      <p class="prompt-text">What is your favourite memory with Ryan Irani?</p>
    </div>
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
  /* background-color: white; */
  font-size: 2rem;
  font-weight: 700;
  /* border-bottom: 1px white solid; */
}

.sub-header-container {
  color: white;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
}

.sub-header {
  font-size: 1.75rem;
}

.message-container {
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #f8f9fa;
  border: 1px white solid;
  width: 90vw;
  height: auto;
  border-radius: 15px;
}

.message-details {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px rgb(0, 0, 0, 0.5) solid;
}
.prompt-label {
  font-weight: 500;
  padding: 10px;
  margin-left: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
}

.sender {
  font-weight: 500;
  padding: 10px;
  margin-right: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
  background-color: #9238ec;
  color: white;
}

.prompt-text {
  font-size: 1.75rem;
  margin-left: 15px;
}
</style>
