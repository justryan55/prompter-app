import { useUserStore } from '@/stores/user'

export const fetchData = async (url, method, payload) => {
  try {
    const params = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      ...(method !== 'GET' && { body: JSON.stringify(payload) })
    }

    const backendURL = import.meta.env.VITE_APP_BACKEND_URL
    const res = await fetch(`${backendURL}/api/${url}`, params)

    return res
  } catch (err) {
    console.log('Error fetching data:', err)
  }
}

// export const fetchCurrentUser = () => {
//   const userStore = useUserStore()
//   const { userId, firstName, lastName, email, myCircle } = userStore

//   return { userId, firstName, lastName, email, myCircle }
// }

// export const fetchCurrentUser = () => {
//   const userStore = useUserStore()
//   const userId = userStore.userId
//   return fetchData(`getCurrentUser/${userId}`, 'GET')
//     .then((res) => res?.json())
//     .then((data) =>
//       userStore.setUser({
//         userId: data.message.userId,
//         firstName: data.message.firstName,
//         lastName: data.message.lastName,
//         email: data.message.email,
//         myCircle: data.message.myCircle,
//         messages: data.message.messages
//       })
//     )
// }
