<script lang="ts">
import ConnectionCard from '@/components/ConnectionCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { fetchCurrentUser, fetchData } from '@/services/helpers'
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyCirclePage',
  components: {
    ConnectionCard,
    NavigationBar
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
    handleClick() {
      this.$router.push('/my-circle/add-friend')
    },

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
    this.fetchCurrentUser()
  }
})
</script>

<template>
  <div class="layout">
    <div class="fixed">
      <div class="header-container">
        <p class="header">{{ firstName }}'s Circle</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          @click="handleClick"
        >
          <path
            d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path
            d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M88 176v112M144 232H32"
          />
        </svg>
      </div>
      <div class="search-container">
        <input type="search" class="search-bar" placeholder="Search your circle" />
      </div>
      <div class="filters">
        <p class="filter">All</p>
        <p class="filter">Family</p>
        <p class="filter">Friends</p>
      </div>
    </div>

    <div v-if="myCircle && Object.values(myCircle).length > 0" class="card-layout">
      <ConnectionCard
        v-for="(connection, index) in myCircle"
        :key="index"
        :connection="connection"
        :connectionUserId="connection.id"
        :connectionFirstName="connection.firstName"
        :connectionLastName="connection.lastName"
        :connectionConnected="connection.connected"
      />
    </div>
    <div v-else class="no-connections-text">You do not have any connections in your circle.</div>

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
  width: 100%;
  color: white;
  /* background-color: white; */
  font-size: 2rem;
  font-weight: 700;
  /* border-bottom: 1px white solid; */
}

.header-container > svg {
  height: 24px;
}

.header-container > svg:hover {
  color: #9238ec;
  cursor: pointer;
}

.filters {
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
}

.filter {
  color: white;
  border: 1px white solid;
  padding: 10px 20px;
  border-radius: 15px;
  width: 50px;
  text-align: center;
}

.filter:hover {
  border: 1px #9238ec solid;
  color: #9238ec;
  cursor: pointer;
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

.card-layout {
  height: 100vh;
  overflow-y: scroll;
}

.card-layout::-webkit-scrollbar {
  display: none;
}
/* .card-container {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  color: white;
} */

.no-connections-text {
  padding: 20px;
  font-size: 1rem;
  color: white;
}
</style>
