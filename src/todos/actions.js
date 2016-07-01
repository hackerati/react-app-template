'use strict'

import * as types from './ActionTypes'

export function add (text) {
    return { type: types.ADD, description: text, completed: false }
}
