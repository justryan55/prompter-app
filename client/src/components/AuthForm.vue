<script setup lang="ts">
import AuthButton from './AuthButton.vue'

const props = defineProps<{
  auth: string
}>()

const payload = {
  email: '',
  password: '',
  ...(props.auth === 'register' && {
    firstName: '',
    lastName: '',
    confirmPassword: ''
  })
}
</script>

<template>
  <input
    v-if="auth === 'register'"
    type="text"
    placeholder="First Name"
    v-model="payload.firstName"
  />
  <input
    v-if="auth === 'register'"
    type="text"
    placeholder="Last Name"
    v-model="payload.lastName"
  />
  <input type="email" placeholder="Email" v-model="payload.email" />
  <input type="password" placeholder="Password" v-model="payload.password" />
  <input
    v-if="auth === 'register'"
    type="password"
    placeholder="Confirm Password"
    v-model="payload.confirmPassword"
  />

  <AuthButton v-if="auth === 'login'" label="Login" v-bind:payload="payload" />
  <AuthButton v-else label="Register" v-bind:payload="payload" />
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
