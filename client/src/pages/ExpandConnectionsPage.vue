<script lang="ts">
import ConnectionCard from '@/components/ConnectionCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { fetchData } from '@/services/helpers'

import { useUserStore } from '@/stores/user'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ExpandConnectionsPage',
  components: {
    ConnectionCard,
    NavigationBar
  },

  data() {
    return {
      searchedUser: {
        connectionFirstName: '',
        connectionLastName: '',
        connectionEmail: '',
        connectionUserId: '',
        connectionConnected: false
      },
      searchInitiated: false
    }
  },

  computed: {
    userId() {
      const userStore = useUserStore()
      return userStore.userId
    },
    firstName() {
      const userStore = useUserStore()
      return userStore.firstName
    },
    lastName() {
      const userStore = useUserStore()
      return userStore.lastName
    },
    email() {
      const userStore = useUserStore()
      return userStore.email
    },
    myCircle() {
      const userStore = useUserStore()
      return userStore.myCircle
    }
  },

  methods: {
    resetSearchedUser() {
      this.searchedUser = {
        connectionFirstName: '',
        connectionLastName: '',
        connectionEmail: '',
        connectionUserId: '',
        connectionConnected: false
      }
    },

    handleClick() {
      this.$router.push('/my-circle')
    },

    async handleSearch(e) {
      if (e.key === 'Enter') {
        const searchValue = e.target.value
        this.searchInitiated = true

        if (searchValue === '') {
          this.searchInitiated = false
          return
        }

        try {
          const res = await fetchData(`${this.userId}/search?query=${searchValue}`, 'GET', '')
          const data = await res?.json()
          console.log(data)
          if (data.message) {
            this.searchedUser = {
              connectionFirstName: data.message.firstName,
              connectionLastName: data.message.lastName,
              connectionEmail: data.message.email,
              connectionUserId: data.message.userId,
              connectionConnected: data.message.connected
            }
          } else {
            this.resetSearchedUser()
          }
        } catch (err) {
          console.log('Error fetching search data:', err)
        }
      }
    }
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          @click="handleClick"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M244 400L100 256l144-144M120 256h292"
          />
        </svg>
        <p class="header">Expand your circle</p>
      </div>
      <div class="search-container">
        <input
          type="search"
          class="search-bar"
          placeholder="Search for connections"
          @keydown="handleSearch"
        />
      </div>
    </div>
    <ConnectionCard
      v-if="searchedUser.connectionFirstName"
      :connectionFirstName="searchedUser.connectionFirstName"
      :connectionLastName="searchedUser.connectionLastName"
      :connectionEmail="searchedUser.connectionEmail"
      :connectionUserId="searchedUser.connectionUserId"
      :connectionConnected="searchedUser.connectionConnected"
    />
    <p v-else-if="!searchInitiated" class="display-message">
      There are no users associated with that email address.
    </p>

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
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  color: white;
  /* background-color: white; */
  font-size: 2rem;
  font-weight: 700;
  /* border-bottom: 1px white solid; */
}

.header-container > svg {
  height: 24px;
  display: flex;
}

.header-container > svg:hover {
  color: #9238ec;
  cursor: pointer;
}

.header {
  text-align: center;
}

.search-container {
  display: flex;
}

.search-bar {
  width: 95vw;
  padding: 12px 20px;
  margin: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;

  outline: none;
  transition:
    border 0.3s ease,
    box-shadow 0.3s ease;
}

.search-bar:focus {
  outline: none;
  border: 1.5px #9238ec solid;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(146, 56, 236, 0.4);
}

.display-message {
  color: white;
  text-align: center;
}
</style>
