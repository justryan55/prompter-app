<script lang="ts">
import { fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageCard',

  data() {
    return {
      isHeld: false,
      holdTime: 1000,
      timer: null as ReturnType<typeof setTimeout> | null,
      preventClick: false
    }
  },

  computed: {
    ...mapState(useUserStore, ['user'])
  },

  props: {
    messageId: String,
    senderId: String,
    senderName: String,
    prompt: String
  },

  methods: {
    ...mapActions(useUserStore, ['fetchCurrentUser']),

    handleClick() {
      if (this.preventClick) {
        return (this.preventClick = false)
      }
      this.$router.push(`/messages/${this.messageId}`)
    },
    startHold() {
      this.timer = setTimeout(() => {
        this.isHeld = true
        this.preventClick = true
      }, this.holdTime)
    },
    endHold() {
      if (this.isHeld) {
        return
      }
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
    },
    async deleteItem() {
      try {
        const res = await fetchData(
          `${this.user?.userId}/${this.messageId}/deleteMessage`,
          'DELETE'
        )

        if (res?.ok) {
          console.log('Message deleted')
          this.fetchCurrentUser()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>

<template>
  <div
    class="message-container"
    @click="handleClick"
    @mousedown="startHold"
    @mouseup="endHold"
    @mouseleave="endHold"
  >
    <div class="message-details">
      <p class="sender">{{ senderName }}</p>
      <p class="prompt">{{ prompt }}</p>
      <p v-if="isHeld" @click.stop="deleteItem" class="delete-btn">Delete</p>
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
  grid-template-columns: 0.5fr 3fr 0.5fr;
  border-bottom: 1px rgb(0, 0, 0, 0.5) solid;
}

.delete-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px black solid;
  font-weight: 500;
  margin-right: 5px;
  border-radius: 15px;
  background-color: #e63946;
  color: white;
  text-align: center;
  grid-column: 3;
  grid-row: 1;
}

.delete-btn:hover {
  cursor: pointer;
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
