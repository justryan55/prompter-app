<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MessageCard from '@/components/MessageCard.vue'

import { fetchCurrentUser, fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageListPage',
  components: {
    NavigationBar,
    MessageCard
  },

  computed: {
    userId() {
      const userStore = useUserStore()
      return userStore.userId
    },
    messages() {
      const userStore = useUserStore()
      return userStore.messages
    }
  },

  methods: {
    // async fetchMessages() {
    //   try {
    //     const res = await fetchData(`${this.userId}/fetchMessages`, 'GET')
    //     const data = await res?.json()

    //     console.log(data.message)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },

    fetchCurrentUser() {
      fetchCurrentUser()
        .then(() => {
          console.log('User data fetched and store updated.')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  mounted() {
    // this.fetchMessages()
    this.fetchCurrentUser()
    console.log(this.messages)
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

    <div v-if="messages">
      <MessageCard
        v-for="(message, id) in messages"
        :key="message._id"
        :messageId="message._id"
        :senderId="message.sender[0]"
        :senderFirstName="message.sender[1]"
        :senderLastName="message.sender[2]"
        :prompt="message.prompt"
      />
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
</style>
