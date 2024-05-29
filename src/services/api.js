import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const pingApi = async () => {
  console.log('api url', `${BASE_URL}/ping`)
  const result = await axios.get(`${BASE_URL}/ping`)
  return result.data
}
