export const fetchData = async (url: string, method: string, payload?: any) => {
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
