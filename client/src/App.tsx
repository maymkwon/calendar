import React from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { ApplicationState } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import ToastContainer from './common/toast/ToastContainer';
import { LayerPopupContainer } from './common/layerpopup';
import './App.css';

type AppProps = {
  store: Store<ApplicationState>;
  history: History;
};

const App: React.FC<AppProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
        <ToastContainer />
        <LayerPopupContainer history={history} />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
