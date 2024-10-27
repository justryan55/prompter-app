import { fetchData } from '@/services/helpers'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
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

    clearUser() {
      this.userId = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.myCircle = {}
      this.messages = []
    },

    async fetchCurrentUser() {
      const userId = this.userId

      try {
        const res = await fetchData(`getCurrentUser/${userId}`, 'GET')
        const data = await res?.json()

        if (res.ok) {
          this.setUser({
            userId: data.message.userId,
            firstName: data.message.firstName,
            lastName: data.message.lastName,
            email: data.message.email,
            myCircle: data.message.myCircle,
            messages: data.message.messages
          })
        } else {
          console.log('Error fetching user information')
        }
      } catch (err) {
        console.log('Fetch failed', err)
      }
    }
  },
  persist: {
    storage: localStorage,
    paths: ['user']
  }
})
