import { Moment as MomentTypes } from "moment";

export enum CalendarActionTypes {
  CHANGE_DATE = '@@calendar/CHANGE_DATE',
  TEST = '@@calendar/TEST'
}
export interface DateData {
  id:number
  title: string
  start: any
  end: any
  type: number
}
// export interface DateData {
//   date: MomentTypes
// }
export interface CalendarState {
  readonly date: MomentTypes
   eventData: DateData[]
}