import moment from 'moment';
import * as dates from 'date-arithmetic';
import { FORMATS } from './constants';
export { startOf, endOf, gt } from 'date-arithmetic';

const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 24,
  day: 1000 * 60 * 60 * 24
};

function getStartOf(date, unit) {
  return date.startOf(unit);
}

function getEndOf(date, unit) {
  return date.endOf(unit);
}

export function diff(date1, date2, unit) {
  if (!unit || unit === 'milliseconds') return Math.abs(+date1 - +date2);
  return Math.round(
    Math.abs(
      +dates.startOf(date1, unit) / MILLI[unit] -
        +dates.startOf(date2, unit) / MILLI[unit]
    )
  );
}
export function cloneDate(date) {
  return date.clone();
}
export function getStartOfDay(date) {
  return getStartOf(date, 'day');
}

export function getStartOfWeek(date) {
  let newDate = cloneDate(date);
  return getStartOf(newDate, 'week');
}
export function getStartOfMonth(date) {
  let newDate = cloneDate(date);
  return getStartOf(newDate, 'month');
}

export function getStartOfDate(date) {
  let newDate = cloneDate(date);
  return getStartOf(newDate, 'date');
}

export function getEndOfWeek(date) {
  let newDate = cloneDate(date);
  return getEndOf(newDate, 'week');
}

export function getEndOfMonth(date) {
  let newDate = cloneDate(date);
  return getEndOf(newDate, 'month');
}
export function getWeekOfMonth(date) {
  let newDate = cloneDate(date);
  return newDate.week() - getStartOfMonth(newDate).week() + 1;
}

export function isSame(date1, date2, unit) {
  let format = {
    day: FORMATS.YMD,
    month: FORMATS.MM
  };
  let a = date1.format(format[unit]);
  let b = date2.format(format[unit]);
  return moment(a).isSame(b, unit);
}

export function isGt(date1, date2, unit) {
  return dates.gt(date1, date2, ['day']);
}

export function getCurrentDate(date, week, add) {
  let newDate = cloneDate(date);
  return newDate
    .week(week)
    .startOf('week')
    .add(add, 'day');
}

export const getSlot = () => {
  let items = [];

  new Array(24).fill(0).forEach((d, i) => {
    items.push(moment({ hour: i }));
  });

  return items;
};

export const getTimeOption = () => {
  let options = []
  getSlot().forEach((o,i) => {
    let obj = {}
    obj.title = o.format('A h 시')
    obj.value = o.format('HH:00')
    options.push(obj)
  })
  return options
}
export const getHourOption = () => {
  let options = []

  Array(24).fill(0).forEach((o,i) => {
    let obj = {}
    obj.label = `${i <10 ? '0' +i : i} : 00 `
    obj.value = i
    options.push(obj)
  })
  return options
}

export const getOverlap = (dateArr) => {
    let defaultResult = { overlap: false, ranges: [] }
    if (!dateArr || dateArr.length === 0) return defaultResult;
    let sortedRange = dateArr.sort((prev, current) => {
      let prevTime = prev.start
      let currentTime = current.start

      if (prevTime <= currentTime) {
        return -1;
      }
      if (prevTime === currentTime) {
        return 0
      }
      return 1
    })

    let result = sortedRange.reduce((result,current, index, arr) => {
      if(index === 0){ return result;}
      let prev = arr[index -1]

      let prevEnd = prev.end
      let prevStart = prev.start
      let currentStart = current.start

      let overlap = ((prevEnd-1) > currentStart)

      if(overlap){
        result.overlap = true

        result.ranges.push({prev,current})
      }
      return result
      
    }, defaultResult)

    return result
  }

  export const getGap = (date1, date2) => {
    let start = moment(date1)
    let end = moment(date2)
    let diff = moment.duration(end.diff(start))
    return diff.hours()
  }