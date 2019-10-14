import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import * as dateUtils from '../../utils/dates';
const Div = styled.div.attrs({
  className: 'event-list'
})`
  position: relative;
  &.event-list {
    height: 200px;
    width: 100%;
    margin-top: 15px;
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
class EventsBox extends Component {
  onDragStart = e => {
    // this.draggedElement.dataset.id;
    let dataId = e.target.id;
    e.dataTransfer.setData('text/plain', dataId);
    e.currentTarget.style.backgroundColor = 'red';
  };
  onClickEvent = (e, event) => {
    e.stopPropagation();
    console.log(event)
  };
  render() {
    const { events, id } = this.props;
    return (
      <Div id={id}>
        {events.length !== 0 &&
          events.map((o, i) => {
            // 이전날로 이동이가능 할까?
            // let diffValue = moment(o.start).diff(moment(), 'day');
            return (
              <div
                id={o.start}
                key={o.start}
                draggable={true}
                onDragStart={this.onDragStart}
                className="event-list__item"
                onClick={(e) => this.onClickEvent(e, o)}
                style={{
                  position: 'absolute',
                  top: `${i * 22}px`,
                  right: 10,
                  left: 10
                }}>
                {o.title}
              </div>
            );
          })}
      </Div>
    );
  }
}

export default EventsBox;
