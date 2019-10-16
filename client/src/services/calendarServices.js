import { apiGet, apiPost } from '../common/api';

export function getFetchEventList() {
  const res = apiGet('/events');
  return res;
}
export function postFetchCreateEvent(data) {
  const res = apiPost('/create', data);
  return res;
}
export function postFetchDeleteEvent(data) {
  const res = apiPost('/delete', data);
  return res;
}
export function postFetchUpdateEvent(data) {
  const res = apiPost('/update', data);
  return res;
}
