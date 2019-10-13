import React, { Component } from 'react';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import moment, { Moment as MomentTypes }from 'moment';
import { componentView, StoryageKey } from '../utils/constants';
import { connect, Provider } from 'react-redux';
import { changeDate } from '../store/calendar/action'
import { showToast } from '../store/system/action'
import { DateData } from '../store/calendar/types'
import { ApplicationState } from '../store'

import 'moment/locale/ko';

// moment.locale('ko');
// interface DateData {
//   title:string,
//   start: any
//   end: any
//   type:number
// }

// let eventData: DateData[] = [
//   {
//     title: 'test1test1test1test1test1test1test1test1test1test1test1',
//     start: moment('2019-10-12 04:00').format('x') as any * 1,
//     end: moment('2019-10-12 05:00').format('x') as any * 1,
//     type: 1
//   },
//   {
//     title: 'test1',
//     start: moment('2019-10-6 05:00').format('x') as any * 1,
//     end: moment('2019-10-6 06:00').format('x') as any * 1,
//     type: 1
//   },
//   {
//     title: 'test1',
//     start: moment('2019-10-8 06:00').format('x')as any * 1,
//     end: moment('2019-10-8 07:00').format('x')as any * 1,
//     type: 1
//   },
//   {
//     title: 'test1',
//     start: moment('2019-10-12 07:00').format('x')as any * 1,
//     end: moment('2019-10-12 08:00').format('x')as any * 1,
//     type: 1
//   },
//   {
//     title: 'test1',
//     start: moment('2019-10-12 08:00').format('x')as any * 1,
//     end: moment('2019-10-12 09:00').format('x')as any * 1,
//     type: 1
//   }
// ];

interface Props {
  date: MomentTypes,
  eventData: DateData[]
}

interface PropsFromDispatch {
  changeDate: typeof changeDate
  showToast: typeof showToast
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
  }

  onChangeView = (view) => {
    this.setState(
      { view }, () => {

        localStorage.setItem(StoryageKey.DEFAULT_VIEW, view)
      }
    );
  };

  render() {
    const { date, eventData } = this.props;
    const {  view } = this.state;
    console.log('Calendar', eventData);
    console.log('Calendar', this.props);
    return (
      <div>
        <div style={{ height: 1 }} ref={this.Trigger} />
        <button onClick={() =>this.props.showToast({title:'???', content:'aaa'})}>aaaa</button>
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
        />
      </div>
    );
  }
}


const mapStateToProps = ({ calendar }: ApplicationState) => ({
  date: calendar.date,
  eventData: calendar.eventData
})

const mapDispatchToProps: PropsFromDispatch = {
  changeDate,
  showToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

