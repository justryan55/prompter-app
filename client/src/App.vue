<script setup lang="ts"></script>

<template>
  <header></header>

  <main class="layout">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
}
</style>
