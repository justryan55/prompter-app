<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageCard',

  props: {
    messageId: String,
    senderId: String,
    senderFirstName: String,
    senderLastName: String,
    prompt: String
  },

  methods: {
    handleClick() {
      this.$router.push(`/messages/${this.messageId}`)
      console.log(this.messageId)
    }
  }
})
</script>

<template>
  <div class="message-container" @click="handleClick">
    <div class="message-details">
      <p class="sender">{{ senderFirstName }} {{ senderLastName }}</p>
      <p class="prompt">{{ prompt }}</p>
    </div>
  </div>
</template>

<style scoped>
.message-container {
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

.message-details {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  /* justify-content: space-between; */
  border-bottom: 1px rgb(0, 0, 0, 0.5) solid;
}

.prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-column: 2;
  grid-row: 1;
  margin: 10px;
}

.sender {
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
