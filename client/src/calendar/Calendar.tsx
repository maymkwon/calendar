import React, { Component } from 'react';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import moment, { Moment as MomentTypes }from 'moment';
import { componentView, StoryageKey } from '../utils/constants';
import { connect, Provider } from 'react-redux';
import { changeDate, getEventList, createEvent, deleteEvent, updateEvent } from '../store/calendar/action'
import { showToast } from '../store/system/action'
import { DateData } from '../store/calendar/types'
import { ApplicationState } from '../store'
import Popup from '../common/popup';
import api from '../common/api'
import 'moment/locale/ko';


interface Props {
  date: MomentTypes,
  eventData: DateData[]
}

interface PropsFromDispatch {
  changeDate: typeof changeDate
  showToast: typeof showToast
  getEventList: typeof getEventList
  createEvent: typeof createEvent
  deleteEvent: typeof deleteEvent
  updateEvent: typeof updateEvent
}

type AllProps = Props & PropsFromDispatch

interface State {
  view:'month'|'week',
  selectDate: MomentTypes
}


class Calendar extends Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
    let defaultView = localStorage.getItem(StoryageKey.DEFAULT_VIEW);
    // let viewState= defaultView ? defaultView : componentView.MONTH;
    this.state = {
      view: 'month',
      selectDate:moment()
    };
  }
  Trigger = React.createRef<HTMLDivElement>();
  
  onChangeDate = (direction:string) => {
    const { view } = this.state;
    const { date, changeDate } = this.props;
    let prevNext = () => {
      return {
        prev: () => changeDate({ date: date.clone().subtract(1, view) }),
        next: () => changeDate({ date: date.clone().add(1, view) })
      };
    };
    let fn = prevNext();
    fn[direction]();
  };

  onSelectDate = (selectDate) => {
    const { changeDate} = this.props
    this.setState({
      selectDate
    }, () => changeDate({ date:selectDate}));
  };

  componentDidMount() {
    let triggerEl = this.Trigger.current;
    let viewHeaderEl  = document.querySelector('#view-header');
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

    this.props.getEventList()
    
  }



  onChangeView = (view) => {
    this.setState(
      { view }, () => {

        localStorage.setItem(StoryageKey.DEFAULT_VIEW, view)
      }
    );
  };

  render() {
    const { date, eventData, createEvent, deleteEvent, updateEvent } = this.props;
    const {  view } = this.state;
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
          createEvent={createEvent}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
        />
      </div>
    );
  }
}


const mapStateToProps = ({ calendar }: ApplicationState) => ({
  date: calendar.date,
  eventData: calendar.events
})

const mapDispatchToProps: PropsFromDispatch = {
  changeDate,
  showToast,
  getEventList,
  createEvent,
  deleteEvent,
  updateEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

