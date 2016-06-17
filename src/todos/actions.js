'use strict'

import { ADD } from './ActionTypes'

export function add (text) {
    return {
        type: ADD,
        description: text,
        completed: false
    }
}
