import {apiGet, apiPost} from '../common/api'

export const getFetchEventList = () => {
  const res = apiGet('/events')
  return res
}
export const postFetchCreateEvent = (data) => {
  const res = apiPost('/create', data)
  return res
}