<script lang="ts">
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DailyPrompt',

  computed: {
    ...mapState(useUserStore, ['userId'])
  },

  methods: {
    handleClick() {
      this.$router.push('/home/prompt')
    },

    async fetchPrompt() {
      try {
        const res = await fetchData(`${this.userId}/fetchPrompt`)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.fetchPrompt()
  }
})
</script>

<template>
  <div class="sub-header-container">
    <p class="sub-header">Daily Prompt</p>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="message-container" @click="handleClick">
    <div class="message-details">
      <p class="prompt-label">Prompt</p>
      <p class="sender">Ryan Irani</p>
    </div>
    <p class="prompt-text">What is your favourite memory with Ryan Irani?</p>
  </div>
</template>

<style scope>
.sub-header-container {
  color: white;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
}

.sub-header {
  font-size: 1.75rem;
}

.message-container {
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #f8f9fa;
  border: 1px white solid;
  width: 90vw;
  height: auto;
  border-radius: 15px;
}

.message-details {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px rgb(0, 0, 0, 0.5) solid;
}
.prompt-label {
  font-weight: 500;
  padding: 10px;
  margin-left: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
}

.sender {
  font-weight: 500;
  padding: 10px;
  margin-right: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
  background-color: #9238ec;
  color: white;
}

.prompt-text {
  font-size: 1.75rem;
  margin-left: 15px;
}
</style>
