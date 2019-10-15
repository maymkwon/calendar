import { Moment as MomentTypes } from "moment";

export enum CalendarActionTypes {
  CHANGE_DATE = '@@calendar/CHANGE_DATE',

  GET_EVENT = '@@calendar/GET_EVENT',
  SUCCESS_EVENT = '@@calendar/SUCCESS_EVENT',

  CREATE_EVENT = '@@calendar/CREATE_EVENT',
  SUCCESS_CREATE_EVENT = '@@calendar/SUCCESS_CREATE_EVENT',

  DELETE_EVENT = '@@calendar/DELETE_EVENT',
  SUCCESS_DELETE_EVENT = '@@calendar/SUCCESS_DELETE_EVENT',

  UPDATE_EVENT = '@@calendar/UPDATE_EVENT',
  SUCCESS_UPDATE_EVENT = '@@calendar/SUCCESS_UPDATE_EVENT'
}

export interface DateData {
  id:number
  title: string
  start: any
  end: any
  type: number
}
export interface DeleteData {
  id:number
}

export interface CalendarState {
  readonly date: MomentTypes
   events: DateData[]
}