import { take, fork, put, takeEvery} from 'redux-saga/effects'
import {CalendarActionTypes} from './types'
import { changeDate} from './action'
import { Moment as MomentTypes } from "moment";

function* changeDates(action: ReturnType<typeof changeDate>) {
  const date = action 
  try{
    yield console.log('SAGA',date)
  } catch(e){

  }
}

function* watchChangeDate() {
  yield takeEvery(CalendarActionTypes.CHANGE_DATE, changeDates)
}
function* calendarSaga() {
  yield fork(watchChangeDate)
}

export default calendarSaga