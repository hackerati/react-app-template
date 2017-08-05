'use strict';

import * as types from './ActionTypes'

export function addTodo(text) {
  return {type: types.ADD, description: text, completed: false}
}

export function editTodo(id, text) {
  return {type: types.EDIT, id: id, description: text}
}

export function deleteTodo(id) {
  return {type: types.DELETE, id: id}
}
