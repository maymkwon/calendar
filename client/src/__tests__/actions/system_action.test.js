import * as systemActions from '../../store/system/action';

import configStore from 'redux-mock-store';
import { SystemActionType } from '../../store/system/types';
import moment from 'moment';

const mockStore = configStore();
const store = mockStore();

describe('캘린더 ACTION', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('토스트 액션.', () => {
    let data = {
      title: '토스트 팝업'
    };
    const expectActions = {
      type: SystemActionType.SHOW_TOAST,
      payload: data
    };
    store.dispatch(systemActions.showToast(data));
    expect(store.getActions()[0].type).toEqual(expectActions.type);
    expect(store.getActions()[0].payload).toEqual(data);
  });
});
