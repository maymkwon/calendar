import { Reducer } from 'redux'
import moment, { Moment as MomentTypes } from 'moment';
import { SystemState, SystemActionType, ToastType } from './types'
import {Record, fromJS} from 'immutable'

const Toast: Record.Factory<ToastType> = Record({
  title:'',
  content:''
})

export const InitalState: SystemState = fromJS({
  queue: []
})

const pushToast = (state, toast) => {
  let getQueue = state.get('queue')
  console.log('getQueue',getQueue)
  return state.set('queue', getQueue.push(new Toast(toast)))
}
const shiftToast = (state) => {
  let getQueue = state.get('queue')
  console.log('shiftToast-getQueue', state.toJS())
  return state.set('queue', getQueue.shift())
}

const reducer: Reducer<SystemState> = (state = InitalState , action) => {
  console.log('STATE', state)
  switch (action.type) {
    case SystemActionType.PUSH_TOAST_TO_QUE: {
      return pushToast(state, action.payload)
    }
    case SystemActionType.SHIFT_TOAST_FROM_QUE: {
      return shiftToast(state)
    }
    default: {
      return state
    }
  }
}

export { reducer as SystemReducer }