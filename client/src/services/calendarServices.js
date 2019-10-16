import { apiGet, apiPost } from "../common/api";

export const getFetchEventList = () => {
  const res = apiGet("/events");
  return res;
};
export const postFetchCreateEvent = data => {
  const res = apiPost("/create", data);
  return res;
};
export const postFetchDeleteEvent = data => {
  const res = apiPost("/delete", data);
  return res;
};
export const postFetchUpdateEvent = data => {
  const res = apiPost("/update", data);
  return res;
};
