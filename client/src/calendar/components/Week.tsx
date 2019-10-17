import React, { Component } from 'react';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as dateUtils from '../../utils/dates';
import { DataKeyFormat } from '../../utils/constants';
import { DateData } from '../../store/calendar/types';
import { CView, CDayTime, CDayCol, CWeek, CDay } from '../../style/SCCalendar';
import EventsBox from './EventsBox';
import Popup from '../../common/popup';

const moment = extendMoment(Moment);
const timeSlot = dateUtils.getSlot();
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
class Week extends Component<Props> {
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

    let splitId = id.split('_');
    let dropZoneDateTime = moment(splitId[0]).toDate();
    let gap = dateUtils.getGap(dragSetData.start, dragSetData.end);

    let newStrtDate = dropZoneDateTime.setHours(splitId[1]);
    let newEndDate = moment(newStrtDate)
      .add(gap, 'hour')
      .valueOf();

    const dayEndTime = moment(splitId[0])
      .clone()
      .endOf('day')
      .valueOf();

    if (dayEndTime < newEndDate) {
      Popup.alert({ message: '일정이 하루 초과합니다.' });
      return;
    }

    let newObj = {
      ...dragSetData,
      start: newStrtDate,
      end: newEndDate
    };
    this.props.updateEvent(newObj);
    e.dataTransfer.clearData();
  };

  getStartEndData = () => {
    const { date } = this.props;
    const start = dateUtils.getStartOfWeek(date);
    const startDay = start.day();
    const end = dateUtils.getEndOfWeek(date);
    const endDay = end.day();

    return {
      start,
      end,
      startDay,
      endDay
    };
  };

  renderView = () => {
    const { events, deleteEvent, updateEvent, view } = this.props;
    let weekdays = dateUtils.getSlot();
    let { startDay, endDay, start } = this.getStartEndData();

    let calendar = [];

    for (let day = startDay; day <= endDay; day++) {
      calendar.push(
        <CDayCol key={day}>
          {weekdays.map((d, i) => {
            let currentDay = moment(start)
              .day(day)
              .set('hour', d.hour());

            let datakey = currentDay.format(DataKeyFormat.week);
            return (
              <CDayTime
                view={view}
                onClick={e => this.onSelectDate(e, currentDay)}
                key={day + d.hour()}
                onDragOver={this.onDragOver}
                onDrop={e => this.onDrop(e, datakey)}
              >
                {/* <strong>{currentDay.format("D")}</strong> */}
                <EventsBox
                  id={datakey}
                  view={view}
                  events={events[datakey] || []}
                  deleteEvent={deleteEvent}
                  updateEvent={updateEvent}
                  setDragData={this.setDragData}
                />
              </CDayTime>
            );
          })}
        </CDayCol>
      );
    }
    return calendar;
  };

  render() {
    return (
      <React.Fragment>
        <CWeek
          id="view-header"
          className="c-view__header c-view__header--month"
          style={{ paddingLeft: 150 }}
        >
          {weekdays.map((dayText, index) => {
            return (
              <CDay className="c-day" key={index}>
                {dayText}
              </CDay>
            );
          })}
        </CWeek>
        <CView direction="row" style={{ marginTop: 30, paddingLeft: 150 }}>
          <CDayCol className="timeslot-col">
            {timeSlot.map(e => {
              return (
                <CDayTime
                  className="aifs timeslot-item"
                  key={e}
                  length={timeSlot.length}
                >
                  <strong>{e.format('A h 시')}</strong>
                </CDayTime>
              );
            })}
          </CDayCol>
          {this.renderView()}
        </CView>
      </React.Fragment>
    );
  }
}

export default Week;
