import { take, fork, put, takeEvery, call} from 'redux-saga/effects'
import {CalendarActionTypes} from './types'
import { SystemActionType} from '../system/types'
import { changeDate, getEventList, createEvent} from './action'
import { Moment as MomentTypes } from "moment";
import { getFetchEventList, postFetchCreateEvent} from '../../services/calendarServices'
import Popup from '../../common/popup';

function* changeDates(action: ReturnType<typeof changeDate>) {
  const date = action 
  try{
    yield console.log('SAGA',date)
  } catch(e){

  }
}
function* getEvent() {
  try{
    const res = yield call(getFetchEventList)
    yield put({ type: CalendarActionTypes.SUCCESS_EVENT, payload: res.data })
  } catch(e){
    Popup.alert()
  }
}
function* eventCreate(action: ReturnType<typeof createEvent>) {
  try{
    let data = action.payload
    // console.log(action.meta)
    const res = yield call(postFetchCreateEvent, data)

    yield put({ type: CalendarActionTypes.SUCCESS_CREATE_EVENT, payload: res.data })
    if (action.meta){
      action.meta()
    }
    yield put({ type: SystemActionType.SHOW_TOAST, payload:{title:'등록 완료', content:''}})

    yield put({ type: CalendarActionTypes.GET_EVENT })
  } catch(e){
    Popup.alert()
  }
}

function* watchCreateEvent() {
  yield takeEvery(CalendarActionTypes.CREATE_EVENT, eventCreate)
}
function* watchChangeDate() {
  yield takeEvery(CalendarActionTypes.CHANGE_DATE, changeDates)
}
function* watchGetEvent() {
  yield takeEvery(CalendarActionTypes.GET_EVENT, getEvent)
}
function* calendarSaga() {
  yield fork(watchChangeDate)
  yield fork(watchGetEvent)
  yield fork(watchCreateEvent)
}

export default calendarSaga