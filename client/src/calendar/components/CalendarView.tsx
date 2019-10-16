import React from 'react';
import { componentView } from '../../utils/constants';
import Week from './Week';
import Month from './Month';
import { DateData } from '../../store/calendar/types';
import { Moment as MomentTypes } from 'moment';

interface Props {
  view: string;
  events: object;
  onSelectDate: any;
  createEvent: any;
  deleteEvent: any;
  updateEvent: any;
  showToast: any;
  date: MomentTypes;
  initDragData: any;
  setDragData: any;
  dragSetData: DateData;
}

const CalendarView = (props: Props) => {
  const { view } = props;
  const Components = {
    [componentView.MONTH]: Month,
    [componentView.WEEK]: Week
  };
  const Calendar: React.ReactType = Components[view];
  return <Calendar {...props} />;
};

export default CalendarView;
