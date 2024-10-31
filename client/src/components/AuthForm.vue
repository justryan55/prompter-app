<script lang="ts">
import { defineComponent } from 'vue'
import AuthButton from './AuthButton.vue'

export default defineComponent({
  components: {
    AuthButton
  },
  props: {
    auth: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      payload: {
        email: '',
        password: '',
        firstName: this.auth === 'register' ? '' : undefined,
        lastName: this.auth === 'register' ? '' : undefined,
        confirmPassword: this.auth === 'register' ? '' : undefined
      }
    }
  }
})
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
