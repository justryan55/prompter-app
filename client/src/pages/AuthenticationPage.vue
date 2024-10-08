<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <main class="layout">
    <p class="title">Login</p>
    <AuthForm />
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
</style>
