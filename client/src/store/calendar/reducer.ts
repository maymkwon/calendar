import {Reducer}from 'redux'
import moment, { Moment as MomentTypes } from 'moment';
import { CalendarState, CalendarActionTypes} from './types'

export const initalState: CalendarState= {
  date: moment(),
  eventData: [
    {
      id:1,
      title: 'test1test1test1test1test1test1test1test1test1test1test1',
      start: moment('2019-10-12 04:00').format('x') as any * 1,
      end: moment('2019-10-12 05:00').format('x') as any * 1,
      type: 1
    },
    {
      id: 2,
      title: 'test1',
      start: moment('2019-10-6 05:00').format('x') as any * 1,
      end: moment('2019-10-6 06:00').format('x') as any * 1,
      type: 1
    },
    {
      id: 3,
      title: 'test1',
      start: moment('2019-10-8 06:00').format('x') as any * 1,
      end: moment('2019-10-8 07:00').format('x') as any * 1,
      type: 1
    },
    {
      id:4,
      title: 'test1',
      start: moment('2019-10-12 07:00').format('x') as any * 1,
      end: moment('2019-10-12 08:00').format('x') as any * 1,
      type: 1
    },
    {
      id:5,
      title: 'test1',
      start: moment('2019-10-12 08:00').format('x') as any * 1,
      end: moment('2019-10-12 09:00').format('x') as any * 1,
      type: 1
    }
  ]
}

const reducer: Reducer<CalendarState> = (state = initalState, action) => {
  console.log('REDUCER', action)
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