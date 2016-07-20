'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import Reactotron from 'reactotron'

const enhancer = compose (
  Reactotron.storeEnhancer(),
  applyMiddleware (thunk)
)

export default function configureStore (initialState) {
  const store = createStore (rootReducer, initialState, enhancer)
  Reactotron.addReduxStore(store)
  return (store)
}
