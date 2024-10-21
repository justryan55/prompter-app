<script lang="ts">
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    connectionFirstName: String,
    connectionLastName: String,
    connectionEmail: String,
    connectionUserId: String,
    connectionConnected: Boolean
  },

  computed: {
    userId() {
      const userStore = useUserStore()
      return userStore.userId
    },
    myCircle() {
      const userStore = useUserStore()
      return userStore.myCircle
    },
    mappedCircle() {
      return this.myCircle.map((user) => ({
        firstName: user.firstName,
        lastName: user.firstName,
        id: user.id
      }))
    },
    isConnected() {
      return this.connectionConnected
    }
  },

  methods: {
    async handleClick() {
      try {
        const endpoint = `${this.userId}/${this.connectionUserId}/toggle-connection`
        const res = await fetchData(endpoint, 'POST')
        const data = await res?.json()
        console.log(data)
        if (res.ok) {
          // this.isConnected = !this.isConnected
        }
      } catch (err) {
        console.log(err)
      }
    },

    async checkConnection() {
      try {
        const connectionExists = this.mappedCircle.some((user) => user.id === this.connectionUserId)
        return connectionExists ? this.isConnected : false
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.checkConnection()
  }
})
</script>

<template>
  <div class="card">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-user"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    <div>
      <p class="name">{{ connectionFirstName }} {{ connectionLastName }}</p>
    </div>
    <p class="button" @click="handleClick">{{ isConnected ? 'Connected' : 'Connect' }}</p>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  color: black;
  background-color: white;
  border-bottom: 1px black solid;
}

svg {
  padding-right: 10px;
}

.button {
  padding: 10px 20px;
  border: 1px black solid;
  margin-right: 10px;
  border-radius: 10px;
  /* background-color: #9238ec; */
  font-weight: 600;
  text-align: center;
}

.button:hover {
  content: 'test';
  cursor: pointer;
  color: #9238ec;
}
</style>
