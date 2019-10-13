import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Calendar from '../calendar/Calendar'
const Routes = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={Calendar} {...props}/>
    </Switch>
  );
};

export default Routes;