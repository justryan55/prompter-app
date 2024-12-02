import { jwtDecode } from 'jwt-decode'

export function isAuthenticated() {
  const token = localStorage.getItem('token')

  if (!token) {
    return false
  }

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (!decoded.exp) {
      console.log('Token does not have an expiration time')
      return false
    }

    if (decoded.exp < currentTime) {
      console.log('Token has expired')
      return false
    }
    return true
  } catch (err) {
    console.log('Invalid token', err)
    return false
  }
}
