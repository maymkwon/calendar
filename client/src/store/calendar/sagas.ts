import { take, fork, put, takeEvery, call, select } from 'redux-saga/effects';
import { CalendarActionTypes } from './types';
import { SystemActionType } from '../system/types';
import { changeDate, createEvent, deleteEvent, updateEvent } from './action';
import { getOverlap } from '../../utils/dates';
import {
  getFetchEventList,
  postFetchCreateEvent,
  postFetchDeleteEvent,
  postFetchUpdateEvent
} from '../../services/calendarServices';
import Popup from '../../common/popup';

const getEvents = state => state.calendar.events;
function* checkOverlay(data) {
  let events = yield select(getEvents);
  let newArr = events.filter(o => o.id !== data.id);
  newArr.push(data);
  let condition = getOverlap(newArr);
  if (condition.overlap) {
    throw { msg: '중복 데이터' };
  } else {
    return condition.overlay;
  }
}

function* getEvent() {
  try {
    const res = yield call(getFetchEventList);
    yield put({ type: CalendarActionTypes.SUCCESS_EVENT, payload: res.data });
  } catch (e) {
    Popup.alert();
  }
}
function* eventCreate(action: ReturnType<typeof createEvent>) {
  try {
    let data = action.payload;
    yield call(checkOverlay, data);

    const res = yield call(postFetchCreateEvent, data);
    yield put({
      type: CalendarActionTypes.SUCCESS_CREATE_EVENT,
      payload: res.data
    });

    if (action.meta) {
      action.meta();
    }

    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: '등록 완료', content: '' }
    });
    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: e.msg ? e.msg : '알 수 없는 오류', content: '' }
    });
  }
}

function* eventDelete(action: ReturnType<typeof deleteEvent>) {
  try {
    let data = action.payload;

    const res = yield call(postFetchDeleteEvent, data);

    yield put({
      type: CalendarActionTypes.SUCCESS_DELETE_EVENT,
      payload: res.data
    });

    if (action.meta) {
      action.meta();
    }

    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: '삭제 완료', content: '' }
    });

    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: '알 수 없는 오류', content: '' }
    });
  }
}

function* eventUpdate(action: ReturnType<typeof updateEvent>) {
  try {
    let data = action.payload;
    yield call(checkOverlay, data);

    const res = yield call(postFetchUpdateEvent, data);
    yield put({
      type: CalendarActionTypes.SUCCESS_UPDATE_EVENT,
      payload: res.data
    });

    if (action.meta) {
      action.meta();
    }

    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: '수정 완료', content: '' }
    });
    yield put({
      type: CalendarActionTypes.INIT_DRAG_DATA
    });

    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put({
      type: SystemActionType.SHOW_TOAST,
      payload: { title: e.msg ? e.msg : '알 수 없는 오류', content: '' }
    });
  }
}

function* watchCreateEvent() {
  yield takeEvery(CalendarActionTypes.CREATE_EVENT, eventCreate);
}
function* watchDeleteEvent() {
  yield takeEvery(CalendarActionTypes.DELETE_EVENT, eventDelete);
}
function* watchUpdateEvent() {
  yield takeEvery(CalendarActionTypes.UPDATE_EVENT, eventUpdate);
}
function* watchGetEvent() {
  yield takeEvery(CalendarActionTypes.GET_EVENT, getEvent);
}

function* calendarSaga() {
  yield fork(watchGetEvent);
  yield fork(watchCreateEvent);
  yield fork(watchDeleteEvent);
  yield fork(watchUpdateEvent);
}

export default calendarSaga;
