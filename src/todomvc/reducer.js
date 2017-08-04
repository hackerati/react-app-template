'use strict';

import {List, Map} from 'immutable'
import uuid from 'uuid'

import * as types from "./ActionTypes";

export default function reducer(state = List([]), action) {
  switch (action.type) {
    case types.ADD:
      return (state.push(Map({id: uuid.v4(), description: action.description, completed: false})));
    default:
      // just return the same state
      return (state)
  }
}
