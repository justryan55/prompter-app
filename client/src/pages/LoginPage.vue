<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <main class="layout">
    <p class="title">Login</p>
    <AuthForm auth="login" />
    <p class="text">
      New to Prompter? <router-link to="/register" class="link">Sign up here.</router-link>
    </p>
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

.text {
  font-size: 1.2rem;
  color: white;
}

.link {
  text-decoration: none;
  font-weight: 700;
  color: #9238ec;
}

.link:hover {
  text-decoration: underline;
}
</style>
