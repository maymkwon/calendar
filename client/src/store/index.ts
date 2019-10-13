import {combineReducers, } from 'redux'
import {all, fork} from 'redux-saga/effects'
import { History } from 'history'
import {connectRouter, RouterState} from 'connected-react-router'

import {CalendarReducer} from './calendar/reducer'
import calendarSaga from './calendar/sagas'
import { CalendarState } from './calendar/types'

import { SystemReducer } from './system/reducer'
import { SystemState } from './system/types'
import systemSaga from './system/sagas'

export const createRootReducer = (history: History) => combineReducers({
  calendar: CalendarReducer,
  system: SystemReducer,
  router: connectRouter(history)
})

export function* rootSaga() {
  yield all([fork(calendarSaga), fork(systemSaga)])
}

export interface ApplicationState {
  calendar: CalendarState,
  system: SystemState,
  router:RouterState
}