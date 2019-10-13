import React, { Component } from 'react';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import moment from 'moment';
import { componentView, StoryageKey } from '../utils/constants';
import 'moment/locale/ko';
// moment.locale('ko');

let eventData = [
  {
    title: 'test1test1test1test1test1test1test1test1test1test1test1',
    start: moment('2019-10-12 04:00').format('x') * 1,
    end: moment('2019-10-12 05:00').format('x') * 1,
    type: 1
  },
  {
    title: 'test1',
    start: moment('2019-10-6 05:00').format('x') * 1,
    end: moment('2019-10-6 06:00').format('x') * 1,
    type: 1
  },
  {
    title: 'test1',
    start: moment('2019-10-8 06:00').format('x') * 1,
    end: moment('2019-10-8 07:00').format('x') * 1,
    type: 1
  },
  {
    title: 'test1',
    start: moment('2019-10-12 07:00').format('x') * 1,
    end: moment('2019-10-12 08:00').format('x') * 1,
    type: 1
  },
  {
    title: 'test1',
    start: moment('2019-10-12 08:00').format('x') * 1,
    end: moment('2019-10-12 09:00').format('x') * 1,
    type: 1
  }
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.Trigger = React.createRef();
    let defaultView = localStorage.getItem(StoryageKey.DEFAULT_VIEW);
    let view = defaultView ? defaultView : componentView.MONTH;
    this.state = {
      date: moment(),
      view
    };
  }
  onChangeDate = direction => {
    const { date, view } = this.state;
    let changeDate = () => {
      return {
        prev: () => this.setState({ date: date.clone().subtract(1, view) }),
        next: () => this.setState({ date: date.clone().add(1, view) })
      };
    };
    let fn = changeDate();
    fn[direction]();
    // this.setState({ date });
  };

  onSelectDate = date => {
    this.setState({
      date
    });
    console.log(date.format('DD'));
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
  }

  onChangeView = view => {
    this.setState(
      { view },
      localStorage.setItem(StoryageKey.DEFAULT_VIEW, view)
    );
  };

  render() {
    const { date, view } = this.state;
    console.log('Calendar', eventData);
    return (
      <div>
        <div id="aaa" style={{ height: 1 }} ref={this.Trigger} />

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

export default Calendar;
