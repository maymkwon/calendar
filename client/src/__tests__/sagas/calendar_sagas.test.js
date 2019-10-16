import * as CalendarSagas from '../../store/calendar/sagas';
import { CalendarActionTypes } from '../../store/calendar/types';
import { SystemActionType } from '../../store/system/types';
import { call, put } from 'redux-saga/effects';
import { recordSaga } from '../../utils/TestUtils';
import * as api from '../../services/calendarServices';
import * as dateUtils from '../../utils/dates';

describe('이벤트 SAGA', () => {
  api.getFetchEventList = jest.fn();
  api.postFetchCreateEvent = jest.fn();
  dateUtils.getOverlap = jest.fn();
  CalendarSagas.checkOverlay = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('이벤트를 조회합니다.', () => {
    const eventData = [{ id: 1, title: '이벤트 입니다.' }];
    const gen = CalendarSagas.getEvent();
    api.getFetchEventList(() => eventData);
    expect(gen.next().value).toEqual(call(api.getFetchEventList));
    expect(gen.next().done).toBeTruthy();
  });

  it('이벤트를 생성 합니다.', async () => {
    const action = {
      payload: {
        end: 1570057200000,
        id: 1,
        start: 1570046400000,
        title: '이벤트 생성'
      }
    };
    CalendarSagas.checkOverlay(() => true);
    const dispatched = await recordSaga(CalendarSagas.eventCreate, action);
    expect(dispatched[0].type).toEqual(SystemActionType.SHOW_TOAST);
  });
});
