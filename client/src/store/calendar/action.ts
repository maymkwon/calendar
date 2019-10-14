import {action} from 'typesafe-actions'
import {CalendarActionTypes, DateData} from './types'

export const changeDate = ({date}: any) => {
  return action(CalendarActionTypes.CHANGE_DATE, date)
}
export const getEventList = () => {
  return action(CalendarActionTypes.GET_EVENT)
}
export const createEvent = (data: DateData, callback) => {
  return action(CalendarActionTypes.CREATE_EVENT, data, callback)
}