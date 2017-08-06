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

export function toggleCompleteOneTodo(id) {
  return {type: types.TOGGLE_COMPLETE_ONE, id: id}
}

export function toggleCompleteAllTodos(all_completed = true) {
  return {type: types.TOGGLE_COMPLETE_ALL, all_completed: all_completed}
}
