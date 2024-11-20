<script lang="ts">
import AuthForm from '@/components/AuthForm.vue'
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { jwtDecode } from 'jwt-decode'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login-Page',
  components: {
    AuthForm
  },

  methods: {
    async handleGuestClick(e) {
      e.preventDefault()

      const guestFormData = {
        firstName: '',
        lastName: '',
        email: 'john.smith@gmail.com',
        password: 'johnsmith123',
        confirmPassword: ''
      }

      try {
        const res = await fetchData(`auth/login`, 'POST', guestFormData)
        const data = await res?.json()

        if (data.token) {
          const { userId, firstName, lastName, email, myCircle } = jwtDecode(data.token)
          window.localStorage.setItem('token', data.token)
          const userStore = useUserStore()
          userStore.setUser({ userId, firstName, lastName, email, myCircle })

          this.$router.push('/home')
        } else {
          console.log('Login failed: No token received.')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>

<template>
  <main class="layout">
    <p class="title">Login</p>
    <AuthForm auth="login" />
    <p class="text">
      New to Prompter? <router-link to="/register" class="link">Sign up here.</router-link>
    </p>
    <p class="text">
      Continue as a guest by
      <router-link to="/home" class="link" @click="handleGuestClick">clicking here</router-link>.
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
