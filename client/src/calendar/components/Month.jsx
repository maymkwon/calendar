import React, { Component } from "react";
import * as Moment from "moment";
import { CView, CWeek, CDay } from "../../style/SCCalendar";
import * as dateUtils from "../../utils/dates";
import { DataKeyFormat } from "../../utils/constants";
import { extendMoment } from "moment-range";
import cn from "classnames";
import EventsBox from "./EventsBox";
import Popup from "../../common/popup";

const moment = extendMoment(Moment);
let weekdays = moment.weekdaysShort();

class CalendarView extends Component {
  onSelectDate = (e, date) => {
    e.preventDefault();
    this.props.onSelectDate(date);
    Popup.createEventPopup({ date, createFunc: this.props.createEvent });
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, id) => {
    const {events} = this.props
    const dataId = e.dataTransfer.getData("text");
    const dragEl = document.getElementById(dataId);
    const dropZone = document.getElementById(id);
    dragEl.style.backgroundColor = "blue";
    dropZone.appendChild(dragEl);
    e.dataTransfer.clearData();

    let originDataHour = moment(dataId *1).format('HH')
    console.log(dataId, originDataHour);
    let resultDate = moment(id+ ' ' + originDataHour).format('x')
    console.log('바꿔야할 데이터',id, resultDate);
    console.log(events[id])
    let dayEvent = events[id]
    let input = this.overlap(dayEvent)
    console.log(input)
  };

  overlap = (dateArr) => {

    let sortedRange = dateArr.sort((prev, current) => {
      let prevTime = prev.start
      let currentTime = current.start

      if(prevTime < currentTime){
        return -1;
      }
      if(prevTime === currentTime){
        return 0
      }
      return 1
    })

    let result = sortedRange.reduce((result,current, index, arr) => {
      if(index === 0){ return result;}
      let prev = arr[index -1]

      let prevEnd = prev.end
      let currentStart = current.start

      let overlap = (prevEnd >currentStart)

      if(overlap){
        result.overlap = true

        result.ranges.push({prev,current})
      }
      return result
      
    }, {overlap:false, ranges:[]})

    return result
  }

  renderView = () => {
    const { date, events, deleteEvent, updateEvent } = this.props;
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
            let isToday = dateUtils.isSame(today, currentDay, "day");
            let isSelected = dateUtils.isSame(date, currentDay, "day");
            let isCurrentMonth = dateUtils.isSame(date, currentDay, "month");
            let day = currentDay.format("D");
            let datakey = currentDay.format(DataKeyFormat.month);
            return (
              <CDay
                key={datakey}
                className={cn("c-day", {
                  selected: isSelected,
                  today: isToday,
                  "c-day__prevnext-day": !isCurrentMonth
                })}
                onClick={e => this.onSelectDate(e, currentDay)}
                onDragOver={this.onDragOver}
                onDrop={e => this.onDrop(e, datakey)}
              >
                <strong className="dfacjcc">{day}</strong>
                <EventsBox
                  id={datakey}
                  events={events[datakey] || []}
                  deleteEvent={deleteEvent}
                  updateEvent={updateEvent}
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
    console.log(moment(1570546800000).format('YYYY-MM-DD HH'))
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
