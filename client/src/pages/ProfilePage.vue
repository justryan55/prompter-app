<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { mapState } from 'pinia'

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ProfilePage',
  components: { NavigationBar },

  computed: {
    ...mapState(useUserStore, ['user'])
  },

  methods: {
    async handleClick() {
      const router = useRouter()

      const res = await fetchData(`${this.user?.userId}/deleteAccount`, 'DELETE')

      if (res?.ok) {
        router.push('/')
      }
    }
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">Your Profile</p>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="settings-container">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="text">My Connections: {{ user?.myCircle.length }}</div>
        <textarea readonly>{{ user?.firstName }}</textarea>
        <textarea readonly>{{ user.lastName }}</textarea>

        <textarea readonly>{{ user.email }}</textarea>
        <div
          v-if="this.user.userId !== '6724adf1355c2c432344f5fc'"
          class="delete-btn"
          @click="handleClick"
        >
          Delete
        </div>
      </div>
    </div>

    <NavigationBar />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.fixed {
  position: sticky;
  background-color: #222222;
  top: 0;
}

.header-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  color: white;
  /* background-color: white; */
  font-size: 2rem;
  font-weight: 700;
  /* border-bottom: 1px white solid; */
  margin-bottom: 50px;
}

.settings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text {
  color: white;
  margin-bottom: 20px;
}

textarea:read-only {
  padding: 20px 0px 0px 10px;
  margin: 0px 0px 10px 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  resize: none;
  overflow: hidden;
}

.delete-btn {
  text-align: center;
  padding: 10px 20px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  background-color: #ed3636;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.5rem;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #fb1e1e;
}
</style>
