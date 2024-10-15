<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <main class="layout">
    <p class="title">Register</p>
    <AuthForm auth="register" />
    <p class="text">
      Already have an account? <router-link to="/login" class="link">Login here.</router-link>
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
