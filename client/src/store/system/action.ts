import { action } from 'typesafe-actions'
import {SystemActionType} from './types'


export const showToast = (data) => {
  return action(SystemActionType.SHOW_TOAST, data)
}
