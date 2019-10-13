import moment,{ Moment as MomentTypes } from "moment";

export enum CalendarActionTypes {
  CHANGE_DATE = '@@calendar/CHANGE_DATE'
}

export interface DateData {
  date: MomentTypes
}
export interface CalendarState {
  readonly date: MomentTypes
}