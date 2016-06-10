'use strict'

import { Map } from 'immutable'

import { INCREMENT_COUNTER,
         DECREMENT_COUNTER,
         INCREMENT_COUNTER_IF_ODD } from '../constants/ActionTypes';

export default function counter (state, action) {
    switch (action.type) {
    case INCREMENT_COUNTER:
        return (state.set ('value', state.get ('value') + 1))
    case DECREMENT_COUNTER:
        return (state.set ('value', state.get ('value') - 1))
    case INCREMENT_COUNTER_IF_ODD:
        const current_value = state.get ('value')

        if (current_value % 2 === 0) { return (state) }

        return (state.set ('value', current_value + 1))
    default:
        return (Map ({ value: 0 }))
    }
}
