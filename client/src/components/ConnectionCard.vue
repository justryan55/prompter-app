<script setup lang="ts"></script>

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
    <p>Ryan Irani</p>
    <p class="button">Connected</p>
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
</style>
