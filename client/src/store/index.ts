import {combineReducers, } from 'redux'
import {all, fork} from 'redux-saga/effects'
import {CalendarReducer} from './calendar/reducer'
import calendarSaga from './calendar/sagas'
import { CalendarState } from './calendar/types'
import { History } from 'history'

export const createRootReducer = (history: History) => combineReducers({
  calendar: CalendarReducer
})

export function* rootSaga() {
  yield all([fork(calendarSaga)])
}

export interface ApplicationState {
  calendar: CalendarState
}