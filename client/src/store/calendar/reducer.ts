import {Reducer}from 'redux'
import moment, { Moment as MomentTypes } from 'moment';
import { CalendarState, CalendarActionTypes} from './types'

export const initalState: CalendarState= {
  date: moment(),
  events: [],
  view:'month',
  dragSetData:{}
}

const reducer: Reducer<CalendarState> = (state = initalState, action) => {
  switch(action.type){
    case CalendarActionTypes.INIT_DRAG_DATA:{
      return { ...state}
    }
    case CalendarActionTypes.CHANGE_DATE:{
      return {...state, date:action.payload}
    }
    case CalendarActionTypes.SUCCESS_EVENT:{
      return {...state, events:action.payload}
    }
    case CalendarActionTypes.CHANGE_VIEW:{
      return {...state, view:action.payload}
    }
    case CalendarActionTypes.DRAG_SET_DATA:{
      return { ...state, dragSetData:action.payload}
    }
    default:{
      return state
    }
  }
}

export {reducer as CalendarReducer}