<script setup lang="ts">
import { fetchData } from '@/services/helpers'
import { jwtDecode } from 'jwt-decode'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  label: string
  payload: { email: string; password: string }
}>()

const message = ref('')
const router = useRouter()

const handleClick = async () => {
  try {
    if (props.label === 'Login') {
      const res = await fetchData('auth/login', 'POST', props.payload)
      const data = await res?.json()

      if (data && data.token) {
        const { userId, firstName, lastName, email, myCircle } = jwtDecode(data.token)
        localStorage.setItem('token', data.token)
        router.push('/home')
      } else {
        message.value = 'Login failed. Please try again.'
      }
    }

    if (props.label === 'Register') {
      const res = await fetchData('auth/register', 'POST', props.payload)
      const data = await res?.json()
      if (data && data.message) {
        message.value = data.message
      }

      if (data && data.message === 'User created') {
        router.push('/login')
      } else {
        message.value = 'Registration failed. Please try again.'
      }
    }
  } catch (err) {
    message.value = 'An error occurred. Please try again.'
  }
}
</script>

<template>
  <button class="button" @click="handleClick">{{ label }}</button>
  <p class="error-message">{{ message }}</p>
</template>

<style scoped>
.button {
  margin: 10px;
  background-color: #9238ec;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 15px 35px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  width: 80%;
  max-width: 360px;
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

.error-message {
  color: #dd1c1a;
}
</style>
