import { action } from "typesafe-actions";
import { CalendarActionTypes, DateData, DeleteData } from "./types";

export const changeDate = ({ date }: any) => {
  return action(CalendarActionTypes.CHANGE_DATE, date);
};
export const getEventList = () => {
  return action(CalendarActionTypes.GET_EVENT);
};
export const createEvent = (data: DateData, callback) => {
  return action(CalendarActionTypes.CREATE_EVENT, data, callback);
};
export const deleteEvent = (data: DeleteData, callback) => {
  return action(CalendarActionTypes.DELETE_EVENT, data, callback);
};
export const updateEvent = (data: DateData, callback) => {
  return action(CalendarActionTypes.UPDATE_EVENT, data, callback);
};
export const changeView = data => {
  return action(CalendarActionTypes.CHANGE_VIEW, data);
};
export const setDragData = data => {
  return action(CalendarActionTypes.DRAG_SET_DATA, data);
};
export const initDragData = () => {
  return action(CalendarActionTypes.INIT_DRAG_DATA);
};
