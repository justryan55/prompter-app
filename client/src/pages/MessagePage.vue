<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">Messages</p>
        <div></div>
        <div></div>
        <div></div>

        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          @click="handleClick"
        >
          <path
            d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path
            d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M88 176v112M144 232H32"
          />
        </svg> -->
      </div>
    </div>
    <div class="prompt-container" @click="handleClick">
      <div class="prompt-labels">
        <p class="connection-label">Tim Harris</p>
        <p class="prompt-question">What is your favourite memory with Ryan Irani?</p>
      </div>
    </div>

    <div class="prompt-container" @click="handleClick">
      <div class="prompt-labels">
        <p class="connection-label">Sarah Cant</p>
        <p class="prompt-question">
          What is the first thing that comes to mind when you think of Ryan Irani?
        </p>
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
}

.prompt-container {
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #f8f9fa;
  border: 1px white solid;
  width: 90vw;
  height: auto;
  border-radius: 15px;
  margin: 3px;
}

.prompt-labels {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  /* justify-content: space-between; */
  border-bottom: 1px rgb(0, 0, 0, 0.5) solid;
}

.prompt-question {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-column: 2;
  grid-row: 1;
  margin: 10px;
}

.connection-label {
  font-weight: 500;
  padding: 10px;
  margin-left: 5px;
  border: 1px black solid;
  border-radius: 15px;
  background-color: #9238ec;
  color: white;
  text-align: center;
  grid-column: 1;
  grid-row: 1;
}
</style>
