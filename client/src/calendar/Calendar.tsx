import React, { Component } from 'react';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import moment, { Moment as MomentTypes } from 'moment';
import { componentView } from '../utils/constants';
import { connect } from 'react-redux';
import { DateData } from '../store/calendar/types';
import { ApplicationState } from '../store';
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import { showToast } from '../store/system/action';
import {
  changeDate,
  getEventList,
  createEvent,
  deleteEvent,
  updateEvent,
  changeView,
  initDragData,
  setDragData
} from '../store/calendar/action';
import { DataKeyFormat } from '../utils/constants';

import 'moment/locale/ko';

interface Props {
  date: MomentTypes;
  view: 'month' | 'week';
  eventData: DateData[];
  dragSetData: DateData;
}

interface PropsFromDispatch {
  changeDate: typeof changeDate;
  showToast: typeof showToast;
  getEventList: typeof getEventList;
  createEvent: typeof createEvent;
  deleteEvent: typeof deleteEvent;
  updateEvent: typeof updateEvent;
  changeView: typeof changeView;
  initDragData: typeof initDragData;
  setDragData: typeof setDragData;
}

type AllProps = Props & PropsFromDispatch;

interface State {
  selectDate: MomentTypes;
}

class Calendar extends Component<AllProps, State> {
  Trigger = React.createRef<HTMLDivElement>();

  onChangeDate = (direction: string) => {
    const { date, changeDate, view } = this.props;
    let prevNext = () => {
      return {
        prev: () => changeDate({ date: date.clone().subtract(1, view) }),
        next: () => changeDate({ date: date.clone().add(1, view) })
      };
    };
    let fn = prevNext();
    fn[direction]();
  };

  onSelectDate = selectDate => {
    this.props.changeDate({ date: selectDate });
  };

  componentDidMount() {
    let triggerEl = this.Trigger.current;
    let viewHeaderEl = document.querySelector('#view-header');
    if (viewHeaderEl) {
      let observer = new IntersectionObserver(
        ent => {
          if (ent[0].intersectionRatio === 0) {
            viewHeaderEl.classList.add('sticky');
          } else if (ent[0].intersectionRatio === 1) {
            viewHeaderEl.classList.remove('sticky');
          }
        },
        { threshold: [0, 1] }
      );
      observer.observe(triggerEl);
    }

    this.props.getEventList();
  }

  onChangeView = view => {
    if (this.props.view === view) return;
    this.props.changeView(view);
  };

  render() {
    const { date, eventData, view, dragSetData } = this.props;
    return (
      <div>
        <div style={{ height: 1 }} ref={this.Trigger} />
        <Controls
          date={date}
          view={view}
          onChangeDate={this.onChangeDate}
          onSelectDate={this.onSelectDate}
          onChangeView={this.onChangeView}
        />
        <CalendarView
          date={date}
          view={view}
          onSelectDate={this.onSelectDate}
          events={eventData}
          dragSetData={dragSetData}
          createEvent={this.props.createEvent}
          deleteEvent={this.props.deleteEvent}
          updateEvent={this.props.updateEvent}
          showToast={this.props.showToast}
          initDragData={this.props.initDragData}
          setDragData={this.props.setDragData}
        />
      </div>
    );
  }
}

const sortedEvents = state => {
  let sortedRange = state.sort((prev, current) => {
    let prevTime = prev.start;
    let currentTime = current.start;

    if (prevTime < currentTime) {
      return -1;
    }
    if (prevTime === currentTime) {
      return 0;
    }
    return 1;
  });

  return sortedRange;
};

const sortedList = (state, props) => {
  let sortedList = sortedEvents(state);
  return sortedList;
};

const groupList = (list, view) => {
  let newEvents = groupBy(list, k => {
    return moment(k.start).format(DataKeyFormat[view]);
  });
  return newEvents;
};

const getView = (state, props) => props;

const getroupByEvents = createSelector(
  [sortedList, getView],
  (list, view) => {
    switch (view) {
      case componentView.MONTH:
        return groupList(list, 'month');
      case componentView.WEEK:
        return groupList(list, 'week');
    }
  }
);

const mapStateToProps = ({ calendar }: ApplicationState) => ({
  date: calendar.date,
  eventData: getroupByEvents(calendar.events, calendar.view),
  view: calendar.view,
  dragSetData: calendar.dragSetData
});

const mapDispatchToProps: PropsFromDispatch = {
  changeDate,
  getEventList,
  createEvent,
  deleteEvent,
  updateEvent,
  showToast,
  changeView,
  initDragData,
  setDragData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
