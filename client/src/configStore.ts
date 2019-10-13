import {Store, createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {History} from 'history'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ApplicationState, createRootReducer, rootSaga} from './store'

export default function configStore(history: History, initialState: ApplicationState){
  const logger = createLogger({collapsed: true})
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = composeWithDevTools({})
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, logger)
    )
  )
  sagaMiddleware.run(rootSaga);
  return store
}