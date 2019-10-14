import { Moment as MomentTypes } from "moment";

export enum CalendarActionTypes {
  CHANGE_DATE = '@@calendar/CHANGE_DATE',
  GET_EVENT = '@@calendar/GET_EVENT',
  SUCCESS_EVENT = '@@calendar/SUCCESS_EVENT',

  CREATE_EVENT = '@@calendar/CREATE_EVENT',
  SUCCESS_CREATE_EVENT = '@@calendar/SUCCESS_CREATE_EVENT'
}

export interface DateData {
  id:number
  title: string
  start: any
  end: any
  type: number
}

export interface CalendarState {
  readonly date: MomentTypes
   events: DateData[]
}