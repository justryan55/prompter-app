<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MessageCard from '@/components/MessageCard.vue'

import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'

export default defineComponent({
  name: 'MessageListPage',
  components: {
    NavigationBar,
    MessageCard
  },

  computed: {
    ...mapState(useUserStore, ['user']),

    filteredMessages() {
      return this.user && this.user.messages
        ? Object.values(this.user.messages).filter((message) => !message.isDeleted)
        : []
    }
  },

  methods: {
    ...mapActions(useUserStore, ['fetchCurrentUser'])
  },

  mounted() {
    this.fetchCurrentUser()
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">Messages</p>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div v-if="filteredMessages.length > 0">
      <!-- user.messages is crashing this page -->
      <MessageCard
        v-for="message in filteredMessages"
        :key="message._id"
        :messageId="message.explicitId"
        :senderId="message.sender?.userId || ''"
        :senderName="
          user?.userId === message.sender?.userId
            ? message.receiver || 'Unknown'
            : message.sender?.firstName && message.sender?.lastName
              ? `${message.sender.firstName} ${message.sender.lastName}`
              : 'Unknown'
        "
        :prompt="message.prompt"
      />
    </div>
    <p v-else class="no-messages-text">You do not have any messages.</p>
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

.no-messages-text {
  padding: 20px;
  font-size: 1rem;
  color: white;
}
</style>
