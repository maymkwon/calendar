import React, { Component } from 'react';
import * as Moment from 'moment';
import { CView, CWeek, CDay } from '../../style/SCCalendar';
import * as dateUtils from '../../utils/dates';
import { DateData } from '../../store/calendar/types';
import { DataKeyFormat } from '../../utils/constants';
import { extendMoment } from 'moment-range';
import cn from 'classnames';
import EventsBox from './EventsBox';
import Popup from '../../common/popup';

const moment = extendMoment(Moment);
let weekdays = moment.weekdaysShort();

interface Props {
  onSelectDate: any;
  createEvent: any;
  events: object;
  deleteEvent: () => {};
  updateEvent: (DateData: DateData) => {};
  setDragData: (object: object) => {};
  view: string;
  date: any;
  dragSetData: DateData;
  showToast: (object: object) => {};
  initDragData: () => {};
}

class CalendarView extends Component<Props> {
  onSelectDate = (e, date) => {
    e.preventDefault();
    this.props.onSelectDate(date);
    Popup.createEventPopup({ date, createFunc: this.props.createEvent });
  };

  setDragData = data => {
    this.props.setDragData(data);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, id) => {
    const { dragSetData } = this.props;
    // const dataId = e.dataTransfer.getData('text');
    // const dragEl = document.getElementById(dataId);

    let dropZoneDate = moment(id).toDate();
    let dragOriginStrtDate = moment(dragSetData.start).toDate();
    let dragOriginEndDate = moment(dragSetData.end).toDate();
    let newStrtDate = dragOriginStrtDate.setDate(dropZoneDate.getDate());
    let newEndDate = dragOriginEndDate.setDate(dropZoneDate.getDate());
    let newObj = {
      ...dragSetData,
      start: newStrtDate,
      end: newEndDate
    };

    // dropZone.appendChild(dragEl);
    this.props.updateEvent(newObj);
    e.dataTransfer.clearData();
  };

  renderView = () => {
    const { date, events, deleteEvent, updateEvent, view } = this.props;
    const today = moment();
    let weekdays = moment.weekdaysShort();
    const start = dateUtils.getStartOfMonth(date);
    const startWeek = start.week();
    const end = dateUtils.getEndOfMonth(date);
    const endWeek = end.week() === 1 ? 53 : end.week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <CWeek key={week}>
          {weekdays.map((d, i) => {
            let currentDay = moment(start)
              .week(week)
              .day(i - 1);
            let isToday = dateUtils.isSame(today, currentDay, 'day');
            let isSelected = dateUtils.isSame(date, currentDay, 'day');
            let isCurrentMonth = dateUtils.isSame(date, currentDay, 'month');
            let day = currentDay.format('D');
            let datakey = currentDay.format(DataKeyFormat.month);
            return (
              <CDay
                key={datakey}
                className={cn('c-day', {
                  selected: isSelected,
                  today: isToday,
                  'c-day__prevnext-day': !isCurrentMonth
                })}
                onClick={e => this.onSelectDate(e, currentDay)}
                onDragOver={this.onDragOver}
                onDrop={e => this.onDrop(e, datakey)}
              >
                <strong className="dfacjcc">{day}</strong>
                <EventsBox
                  view={view}
                  id={datakey}
                  events={events[datakey] || []}
                  deleteEvent={deleteEvent}
                  updateEvent={updateEvent}
                  setDragData={this.setDragData}
                />
              </CDay>
            );
          })}
        </CWeek>
      );
    }
    return calendar;
  };

  render() {
    return (
      <CView>
        <CWeek
          id="view-header"
          className="c-view__header c-view__header--month"
        >
          {weekdays.map((dayText, i) => {
            return (
              <CDay key={i} className="c-day">
                {dayText}
              </CDay>
            );
          })}
        </CWeek>
        {this.renderView()}
      </CView>
    );
  }
}

export default CalendarView;
