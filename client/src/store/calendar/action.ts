import {action} from 'typesafe-actions'
import {CalendarActionTypes, DateData} from './types'

export const changeDate = (date: any) => {
  action(CalendarActionTypes.CHANGE_DATE, date)
}