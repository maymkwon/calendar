import React from 'react';
import {Store} from 'redux'
import { History} from 'history'
import {ApplicationState} from './store'
import { connect, Provider } from 'react-redux';
import {changeDate} from './store/calendar/action'
import Calendar from './calendar/Calendar';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes'
import ToastContainer from './common/ToastContainer'
import './App.css';

type AppProps = {
  store: Store<ApplicationState>
  history: History
}

const App: React.FC<AppProps> = ({store, history}) => {
  return (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
      <ToastContainer />
    </ConnectedRouter>
  </Provider>
  );
}

export default App


