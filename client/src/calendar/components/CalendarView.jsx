import React, { Component } from 'react';
import { componentView, DataKeyFormat } from '../../utils/constants';
import cn from 'classnames';
import Week from './Week';
import Month from './Month';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import groupBy from 'lodash/groupBy';
const moment = extendMoment(Moment);

class CalendarView extends Component {
  convertData = () => {
    const { view } = this.props;
    const { events } = this.props;
    let newEvents = groupBy(events, k => {
      return moment(k.start).format(DataKeyFormat[view]);
    });
    return newEvents;
  };

  render() {
    const { view, date } = this.props;
    let convertEventData = this.convertData();
    console.log('convertEventData', convertEventData);
    const Components = {
      [componentView.MONTH]: Month,
      [componentView.WEEK]: Week
    };
    const Calendar = Components[view];
    return <Calendar {...this.props} events={convertEventData} />;
  }
}

export default CalendarView;
