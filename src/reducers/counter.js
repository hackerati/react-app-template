'use strict'

import { Map } from 'immutable'

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function counter (state, action) {
    switch (action) {
    case INCREMENT_COUNTER:
        return (state.set ('value', state.get ('value') + 1))
    case DECREMENT_COUNTER:
        return (state.set ('value', state.get ('value') - 1))
    default:
        return (Map ({ value: 0 }))
    }
}
