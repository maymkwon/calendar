import React, { Component } from 'react';
import { componentView } from '../../utils/constants';
import Week from './Week';
import Month from './Month';

import { Moment as MomentTypes } from "moment";


interface Props {
  view:string
  events: object
  onSelectDate:any
  createEvent:any
  deleteEvent:any
  updateEvent:any
  date: MomentTypes
}

class CalendarView extends Component<Props> {
  
  render() {
    const { view, events } = this.props;
    const Components = {
      [componentView.MONTH]: Month,
      [componentView.WEEK]: Week
    };
    const Calendar = Components[view];
    return <Calendar {...this.props} events={events} view={view} />;
  }
}

export default CalendarView;
