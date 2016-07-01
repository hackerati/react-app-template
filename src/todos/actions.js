'use strict'

import * as types from './ActionTypes'

export function add (text) {
    return { type: types.ADD, description: text, completed: false }
}

export function edit (id, text) {
    console.log (id + ' ' + text)
    return { type: types.EDIT, id: id, description: text }
}
