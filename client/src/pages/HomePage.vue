<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import DailyPrompt from '@/components/DailyPrompt.vue'

import { defineComponent } from 'vue'
import { fetchData } from '@/services/helpers'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'HomePage',
  components: {
    NavigationBar,
    DailyPrompt
  },

  data() {
    return {
      streak: false,
      streakCounter: null
    }
  },

  computed: {
    ...mapState(useUserStore, ['user'])
  },

  methods: {
    async fetchStreak() {
      try {
        const res = await fetchData(`${this.user?.userId}/fetchStreak`, 'GET')
        const data = await res?.json()

        if (res?.ok && data.message > 0) {
          this.streak = true
          this.streakCounter = data.message
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.fetchStreak()
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">Home</p>
        <div></div>
        <div></div>
        <div>
          <div class="streak-container">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
              <path
                d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 01-288 0z"
                fill="none"
                :stroke="streak ? '#9238ec' : 'grey'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z"
                fill="none"
                :stroke="streak ? '#9238ec' : 'grey'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
            <p>{{ this.streakCounter }}</p>
          </div>
        </div>
      </div>
    </div>
    <DailyPrompt />
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
  font-size: 2rem;
  font-weight: 700;
}

svg {
  height: 2.5rem;
}

.streak-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
}
</style>
