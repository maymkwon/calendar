import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:3001'
})

export const apiGet = (url) => {
  return api.get(url)
}
export const apiPost = (url, data) => {
  return api.post(url, data)
}

export default api