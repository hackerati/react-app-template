'use strict';

import {combineReducers} from 'redux'
import todomvc from './todomvc'

const rootReducer = combineReducers({
  todos: todomvc.reducer
});

export default rootReducer
