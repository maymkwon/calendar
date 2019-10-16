import { fork, put, takeEvery, call, select } from 'redux-saga/effects';
import { CalendarActionTypes } from './types';
import { createEvent, deleteEvent, updateEvent } from './action';
import { getOverlap } from '../../utils/dates';
import {
  getFetchEventList,
  postFetchCreateEvent,
  postFetchDeleteEvent,
  postFetchUpdateEvent
} from '../../services/calendarServices';
import { showToast} from '../system/action'
import Popup from '../../common/popup';

export const getEventsSelect = state => state.calendar.events;

export function* checkOverlay(data) {
  let events = yield select(getEventsSelect);
  let newArr = events.filter(o => o.id !== data.id);
  newArr.push(data);
  let condition = getOverlap(newArr);
  if (condition.overlap) {
    throw new Error('중복 데이터');
  } else {
    return condition.overlay;
  }
}

export function* getEvent() {
  try {
    const res = yield call(getFetchEventList);
    yield put({ type: CalendarActionTypes.SUCCESS_EVENT, payload: res.data });
  } catch (e) {
    Popup.alert({ message: e.message });
  }
}
export function* eventCreate(action: ReturnType<typeof createEvent>) {
  try {
    let data = action.payload;
    yield call(checkOverlay, data);

    yield call(postFetchCreateEvent, data);
    yield put({
      type: CalendarActionTypes.SUCCESS_CREATE_EVENT
    });

    if (action.meta) {
      action.meta();
    }

    yield put(showToast({ title: '등록 완료' }))
    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put(showToast({ title: e ? e.toString() : '알 수 없는 오류' }))
   
  }
}

export function* eventDelete(action: ReturnType<typeof deleteEvent>) {
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

    yield put(showToast({ title: '삭제 완료' }))

    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put(showToast({ title: '알 수 없는 오류' }))
  }
}

export function* eventUpdate(action: ReturnType<typeof updateEvent>) {
  try {
    let data = action.payload;
    yield call(checkOverlay, data);

    yield call(postFetchUpdateEvent, data);
    yield put({
      type: CalendarActionTypes.SUCCESS_UPDATE_EVENT
    });

    if (action.meta) {
      action.meta();
    }

    yield put(showToast({ title: '수정 완료' }))
    
    yield put({
      type: CalendarActionTypes.INIT_DRAG_DATA
    });

    yield put({ type: CalendarActionTypes.GET_EVENT });
  } catch (e) {
    yield put(showToast({ title: e ? e.toString() : '알 수 없는 오류' }))
    // yield put({
    //   type: SystemActionType.SHOW_TOAST,
    //   payload: { title: e ? e.toString() : '알 수 없는 오류' }
    // });
  }
}

export function* watchCreateEvent() {
  yield takeEvery(CalendarActionTypes.CREATE_EVENT, eventCreate);
}
export function* watchDeleteEvent() {
  yield takeEvery(CalendarActionTypes.DELETE_EVENT, eventDelete);
}
export function* watchUpdateEvent() {
  yield takeEvery(CalendarActionTypes.UPDATE_EVENT, eventUpdate);
}
export function* watchGetEvent() {
  yield takeEvery(CalendarActionTypes.GET_EVENT, getEvent);
}

function* calendarSaga() {
  yield fork(watchGetEvent);
  yield fork(watchCreateEvent);
  yield fork(watchDeleteEvent);
  yield fork(watchUpdateEvent);
}

export default calendarSaga;
