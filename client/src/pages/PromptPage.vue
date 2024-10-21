<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PromptPage',
  components: {},

  methods: {
    handleCloseClick() {
      this.$router.push('/home')
    }
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header"></p>
      </div>
    </div>

    <div class="prompt-container">
      <div class="prompt-header-container">
        <p class="prompt-header">Prompt</p>
        <p class="close-prompt" @click="handleCloseClick">X</p>
      </div>
      <p class="prompt-text">What is your favourite memory with Ryan Irani?</p>
    </div>
    <!-- <NavigationBar /> -->

    <div class="input-container">
      <input type="text" class="input" />
    </div>
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
  font-size: 1rem;
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

.prompt-container {
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #f8f9fa;
  border: 1px white solid;
  width: 90vw;
  height: auto;
  border-radius: 15px;
}

.prompt-header-container {
  display: flex;
  justify-content: space-between;
}

.prompt-header {
  font-weight: 500;
  padding: 10px;
  margin-left: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
}

.close-prompt {
  font-weight: 700;
  padding-right: 20px;
}

.prompt-text {
  font-size: 1.75rem;
  margin-left: 15px;
}

.input-container {
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
}

.input {
  width: 80vw;
  padding: 20px;
  border-radius: 15px;
}
</style>
