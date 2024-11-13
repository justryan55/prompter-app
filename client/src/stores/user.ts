import type { User } from '@/interfaces/userInterface'
import { fetchData } from '@/services/helpers'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: undefined as undefined | User,
    dailyPromptMessageId: '',
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = undefined;
    },
    async fetchCurrentUser() {
      const userId = this.user?.userId;

      try {
        const res = await fetchData(`getCurrentUser/${userId}`, 'GET');
        const data = await res?.json();

        if (res?.ok) {
          const user = data.message as User;
          this.setUser(user);
        } else {
          console.log('Error fetching user information')
        }
      } catch (err) {
        console.log('Fetch failed', err)
      }
    },
    setDailyPromptMessageId(messageId: string) {
      this.dailyPromptMessageId = messageId;
    }
  },
  persist: {
    storage: localStorage,
    pick: ['user'],
  }
})
