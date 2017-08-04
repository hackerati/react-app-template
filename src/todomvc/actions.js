'use strict';

import * as types from './ActionTypes'

export function addTodo(text) {
  return {type: types.ADD, description: text, completed: false}
}
