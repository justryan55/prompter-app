import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    myCircle: {},
    messages: []
  }),

  actions: {
    setUser(user) {
      this.userId = user.userId
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
      this.myCircle = user.myCircle
      this.messages = user.messages
    },

    clearUser(user) {
      this.userId = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.myCircle = {}
    }
  },
  persist: {
    storage: localStorage,
    paths: ['user']
  }
})
