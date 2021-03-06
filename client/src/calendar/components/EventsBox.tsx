import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DateData } from '../../store/calendar/types';
import Popup from '../../common/popup';
const Div = styled.div.attrs({
  className: 'event-list'
})`
  position: relative;
  &.event-list {
    height: 200px;
    width: 100%;
    margin-top: ${({ view }) => (!view ? 15 : 0)}px;
    user-select: none;
  }
  .event-list__item {
    background: black;
    color: #fff;
    height: 20px;
    border-radius: 4px;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .event-list__item + .event-list__item {
    margin-top: 2px;
  }
`;

interface Props {
  events: DateData[];
  deleteEvent: () => {};
  updateEvent: (any) => void;
  setDragData: (any) => void;
  view: string;
  id: string;
}
class EventsBox extends Component<Props> {
  onDragStart = (e, event) => {
    this.props.setDragData(event);
    let dataId = e.target.id;
    e.dataTransfer.setData('text/plain', dataId);
  };
  onClickEvent = (e, event) => {
    e.stopPropagation();
    Popup.detailEventPopup({
      event,
      updateEvent: this.props.updateEvent,
      deleteEvent: this.props.deleteEvent
    });
  };
  render() {
    const { events, id, view } = this.props;
    return (
      <Div id={id} view>
        {events.length !== 0 &&
          events.map((o, i) => {
            // 이벤트는 이전날로 이동이가능 할까?
            // let diffValue = moment(o.start).diff(moment(), 'day');
            let start = moment(o.start);
            let end = moment(o.end);
            let diff = moment.duration(end.diff(start));
            let calHour = diff.hours();
            return (
              <div
                id={o.start}
                key={o.start}
                draggable={true}
                onDragStart={e => this.onDragStart(e, o)}
                className="event-list__item"
                onClick={e => this.onClickEvent(e, o)}
                style={{
                  position: 'absolute',
                  top: `${i * 22}px`,
                  right: 10,
                  left: 10,
                  height: `${view === 'week' && calHour * 50}px`,
                  zIndex: 999
                }}
              >
                {o.title} {start.hours()}시 ~{end.hours()}시
              </div>
            );
          })}
      </Div>
    );
  }
}

export default EventsBox;
