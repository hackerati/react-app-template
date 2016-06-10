'use strict'

import { Map } from 'immutable'

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function counter (state, action) {
    switch (action.type) {
    case INCREMENT_COUNTER:
        return state + 1
    case DECREMENT_COUNTER:
        return state - 1
    default:
        return (Map ({ value: 0 }))
    }
}
