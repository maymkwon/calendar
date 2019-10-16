import * as calendarAction from '../../store/calendar/action';
import { createAction } from 'typesafe-actions';

import configStore from 'redux-mock-store';
import { CalendarActionTypes } from '../../store/calendar/types';
import moment from 'moment';

const mockStore = configStore();
const store = mockStore();

describe('캘린더 ACTION', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('날짜를 변경 합니다.', () => {
    let payloadDate = moment('2019-10-16');
    let data = {
      date: payloadDate
    };
    const expectActions = {
      type: CalendarActionTypes.CHANGE_DATE,
      payload: data
    };
    store.dispatch(calendarAction.changeDate(data));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(payloadDate);
  });
  it('날짜 생성 액션', () => {
    const dateData = {
      title: '이벤트 생성',
      end: 1570057200000,
      start: 1570046400000
    };

    const expectActions = {
      type: CalendarActionTypes.CREATE_EVENT,
      payload: dateData
    };
    store.dispatch(calendarAction.createEvent(dateData));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(dateData);
  });

  it('날짜 삭제 액션', () => {
    const deleteData = {
      id: 0
    };

    const expectActions = {
      type: CalendarActionTypes.DELETE_EVENT,
      payload: deleteData
    };
    store.dispatch(calendarAction.deleteEvent(deleteData));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(deleteData);
  });

  it('날짜 수정 액션', () => {
    const dateData = {
      id: 2,
      title: '이벤트 생성',
      end: 1570057200000,
      start: 1570046400000
    };

    const expectActions = {
      type: CalendarActionTypes.UPDATE_EVENT,
      payload: dateData
    };
    store.dispatch(calendarAction.updateEvent(dateData));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(dateData);
  });
  it('VIEW CHANGE 액션', () => {
    let view = 'month';

    const expectActions = {
      type: CalendarActionTypes.CHANGE_VIEW,
      payload: view
    };
    store.dispatch(calendarAction.changeView(view));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(view);
  });
  it('DRAG 액션', () => {
    const dateData = {
      id: 2,
      title: '이벤트 생성',
      end: 1570057200000,
      start: 1570046400000
    };

    const expectActions = {
      type: CalendarActionTypes.DRAG_SET_DATA,
      payload: dateData
    };
    store.dispatch(calendarAction.setDragData(dateData));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(dateData);
  });
  it('DRAG 초기화 액션', () => {
    const expectActions = {
      type: CalendarActionTypes.INIT_DRAG_DATA
    };
    store.dispatch(calendarAction.initDragData());
    expect(store.getActions()[0].type).toEqual(expectActions.type);
  });
});
