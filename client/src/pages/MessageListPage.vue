<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MessageCard from '@/components/MessageCard.vue'

// import { fetchCurrentUser, fetchData } from '@/services/helpers'
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
    ...mapState(useUserStore, ['userId', 'messages'])
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

    <div v-if="messages && Object.values(messages).length > 0">
      <MessageCard
        v-for="(message, id) in messages"
        :key="message._id"
        :messageId="message.explicitId"
        :senderId="message.sender[0]"
        :senderFirstName="message.sender[1]"
        :senderLastName="message.sender[2]"
        :prompt="message.prompt"
      />
    </div>
    <p v-else class="no-messages-text">You do not have any connections in your circle.</p>
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
