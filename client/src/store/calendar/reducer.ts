import {Reducer}from 'redux'
import moment, { Moment as MomentTypes } from 'moment';
import { CalendarState, CalendarActionTypes} from './types'

export const initalState: CalendarState= {
  date: moment(),
  events: []
}

const reducer: Reducer<CalendarState> = (state = initalState, action) => {
  switch(action.type){
    case CalendarActionTypes.CHANGE_DATE:{
      return {...state, date:action.payload}
    }
    case CalendarActionTypes.SUCCESS_EVENT:{
      return {...state, events:action.payload}
    }
    default:{
      return state
    }
  }
}

export {reducer as CalendarReducer}