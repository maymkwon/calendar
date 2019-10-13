import React from 'react';
import {Store} from 'redux'
import { History} from 'history'
import {ApplicationState} from './store'
import logo from './logo.svg';
import './App.css';

interface AppProps {
  store: Store<ApplicationState>
  history: History
}


const App: React.FC<AppProps> = ({store, history}) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
