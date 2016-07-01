'use strict'

import * as types from './ActionTypes'

export function add (text) {
    return { type: types.ADD, description: text, completed: false }
}

export function edit (id, text) {
    return { type: types.EDIT, id: id, description: text }
}

export function del (id) { // 'delete' is a keyword so can't use it for the function name :-(
    return { type: types.DELETE, id: id }
}

export function complete (id) {
    return { type: types.COMPLETE, id: id }
}
