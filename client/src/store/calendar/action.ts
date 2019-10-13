import {action} from 'typesafe-actions'
import {CalendarActionTypes, DateData} from './types'

export const changeDate = ({date}: any) => {
  console.log('ACTION',date.format('YYYY-MM-DD HH'))
  return action(CalendarActionTypes.CHANGE_DATE, date)
}