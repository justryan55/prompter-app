<script setup lang="ts">
import AuthButton from './AuthButton.vue'
</script>

<template>
  <input type="email" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <AuthButton label="Login" />
</template>

<style scoped>
input {
  box-sizing: border-box;
  width: 80%;
  max-width: 360px;
  padding: 10px;
  margin: 10px;
}

input::placeholder {
  text-align: start;
}
</style>
