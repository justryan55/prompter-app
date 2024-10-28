<script lang="ts">
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PromptPage',
  components: {},

  data() {
    return {
      promptMessage: '',
      recipient: '',
      recipientId: '',
      message: '',
      own: true
    }
  },

  computed: {
    ...mapState(useUserStore, [
      'userId',
      'firstName',
      'lastName',
      'email',
      'myCircle',
      'messages',
      'dailyPromptMessageId'
    ])
  },

  methods: {
    handleCloseClick() {
      this.$router.push('/home')
    },

    async handleSubmit(e) {
      if (e.key === 'Enter') {
        const connectionId = this.recipientId

        const payload = {
          sender: { userId: this.userId, firstName: this.firstName, lastName: this.lastName },
          prompt: this.promptMessage,
          message: e.target.value
        }
        const res = await fetchData(`${this.userId}/${connectionId}/new-message`, 'POST', payload)

        if (res.ok) {
          const data = await res?.json()
          this.message = data.message
          const userStore = useUserStore()
          await userStore.setdailyPromptMessageId(data.messageId)
        }
      }
    },

    async fetchMessage() {
      try {
        const res = await fetchData(`${this.userId}/messages/${this.dailyPromptMessageId}`, 'GET')
        const data = await res?.json()
        if (res?.ok) {
          this.message = data.message.message
          this.own = data.message.sender[0] === this.userId
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.promptMessage = this.$route.query.message
    this.recipient = this.$route.query.recipient
    this.recipientId = this.$route.query.recipientId
    this.fetchMessage()
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header"></p>
      </div>
    </div>

    <div class="message-container">
      <div class="prompt-header-container">
        <!-- <p class="prompt-header">Prompt</p> -->
        <p class="close-prompt" @click="handleCloseClick">X</p>
      </div>
      <p class="prompt-text">{{ promptMessage }}</p>
    </div>

    <div v-if="message" :class="own ? 'outgoing-message-container' : 'incoming-message-container'">
      <div :class="own ? 'outgoing-message' : 'incoming-message'">{{ message }}</div>
    </div>

    <!-- <NavigationBar /> -->
    <div v-if="!this.message" class="input-container">
      <input
        type="text"
        class="input"
        placeholder="Respond to the prompt"
        @keydown="handleSubmit"
      />
    </div>
    <div v-else class="awaiting-text">Awaiting a response</div>

    <!-- <div v-else class="input-container">
      <input
        type="text"
        class="input"
        placeholder="You have already responded to this prompt."
        readonly
      />
    </div> -->
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
  font-size: 1rem;
}

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

.prompt-header-container {
  display: flex;
  justify-content: flex-end;
}

.prompt-header {
  font-weight: 500;
  padding: 10px;
  margin-left: 10px;
  width: fit-content;
  border: 1px black solid;
  border-radius: 15px;
}

.close-prompt {
  font-weight: 700;
  padding-right: 20px;
}

.close-prompt:hover {
  cursor: pointer;
}

.prompt-text {
  font-size: 1.75rem;
  margin-left: 15px;
}

.input-container {
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
}

.input {
  width: 80vw;
  padding: 20px;
  border-radius: 15px;
  outline: none;
  transition:
    border 0.3s ease,
    box-shadow 0.3s ease;
}

.input:focus {
  outline: none;
  border: 1.5px #9238ec solid;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(146, 56, 236, 0.4);
}

.outgoing-message-container {
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 20px;
}

.outgoing-message {
  color: white;
  background-color: #9238ec;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(146, 56, 236, 0.4);
}

.incoming-message-container {
  width: 100vw;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.incoming-message {
  color: black;
  background-color: #e9dbf6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(146, 56, 236, 0.4);
}

.awaiting-text {
  color: white;
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
}
</style>
