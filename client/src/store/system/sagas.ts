import { SystemActionType } from './types';
import { put, takeEvery, delay, fork } from 'redux-saga/effects';

export function* toastQueue(action) {
  yield put({
    type: SystemActionType.PUSH_TOAST_TO_QUE,
    payload: action.payload
  });
  yield delay(3000);
  yield put({ type: SystemActionType.SHIFT_TOAST_FROM_QUE });
}

function* showToast() {
  yield takeEvery(SystemActionType.SHOW_TOAST, toastQueue);
}
function* systemSaga() {
  yield fork(showToast);
}

export default systemSaga;
