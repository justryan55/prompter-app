<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MessageCard from '@/components/MessageCard.vue'

import { fetchCurrentUser, fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessagePage',
  components: {
    NavigationBar
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed"></div>

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
</style>
