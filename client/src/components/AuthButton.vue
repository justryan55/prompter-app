<script lang="ts">
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { jwtDecode } from 'jwt-decode'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthButton',

  props: {
    label: {
      type: String,
      required: true
    },
    payload: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      message: ''
    }
  },

  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    return { router, userStore }
  },

  methods: {
    async handleClick() {
      try {
        if (this.label === 'Login') {
          const res = await fetchData('auth/login', 'POST', this.payload)
          const data = await res?.json()

          if (data && data.token) {
            const { userId, firstName, lastName, email, myCircle } = jwtDecode(data.token) as any
            localStorage.setItem('token', data.token)
            this.userStore.setUser({ userId, firstName, lastName, email, messages: [], myCircle })

            this.router.push('/home')
          } else {
            this.message = data.message
          }
        }

        if (this.label === 'Register') {
          const res = await fetchData('auth/register', 'POST', this.payload)
          const data = await res?.json()
          if (data && data.message) {
            this.message = data.message
          }

          if (data && data.message === 'User created') {
            this.router.push('/login')
          } else {
            this.message = data.message
          }
        }
      } catch (err) {
        this.message = 'An error occurred. Please try again.'
      }
    }
  }
})

// const props = defineProps<{
//   label: string
//   payload: { email: string; password: string }
// }>()

// const message = ref('')
// const router = useRouter()
// const userStore = useUserStore()
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
