import {Reducer}from 'redux'
import moment, { Moment as MomentTypes } from 'moment';
import { CalendarState, CalendarActionTypes} from './types'
import {changeDate}from './action'

export const initalState: CalendarState= {
  date: moment()
}

const reducer: Reducer<CalendarState> = (state = initalState, action) => {
  switch(action.type){
    case CalendarActionTypes.CHANGE_DATE:{
      return {...state, date:action.payload}
    }
    default:{
      return state
    }
  }
}

export {reducer as CalendarReducer}