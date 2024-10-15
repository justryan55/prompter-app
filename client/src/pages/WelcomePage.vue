<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleClick = () => {
  router.push('/login')
}
</script>

<template>
  <main class="layout">
    <p class="title">Welcome to Prompter</p>
    <button class="button" @click="handleClick">Get Started</button>
  </main>
</template>

<style scoped>
.layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 98vh;
}

.title {
  font-size: 2rem;
  color: white;
}

.button {
  background-color: #9238ec;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 15px 35px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

.button:hover {
  background-color: #9657d4;
}

.button:active {
  background-color: #8929c9;
  transform: scale(0.98);
}
</style>
