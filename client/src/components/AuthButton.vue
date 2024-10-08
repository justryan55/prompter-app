<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string
}>()
</script>

<template>
  <button class="button">{{ label }}</button>
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
</style>
