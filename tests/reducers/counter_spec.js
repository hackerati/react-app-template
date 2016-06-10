'use strict'

import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import counter from '../../src/reducers/counter'
import { INCREMENT_COUNTER,
         DECREMENT_COUNTER,
         INCREMENT_COUNTER_IF_ODD } from '../../src/constants/ActionTypes';

describe ('counter reducer', () => {
    it ('should handle initial state', () => {
        const state = counter (undefined, {})
        expect (state).to.equal (fromJS ({
            value: 0
        }))
    })

    it ('should increment on INCREMENT_COUNTER', () => {
        const state = Map ({ value : 0 })
        const new_state = counter (state, { type: INCREMENT_COUNTER })
        expect (new_state).to.equal (fromJS ({
            value: 1
        }))
    })

    it ('should decrement on DECREMENT_COUNTER', () => {
        const state = Map ({ value : 0 })
        const new_state = counter (state, { type: DECREMENT_COUNTER })
        expect (new_state).to.equal (fromJS ({
            value: -1
        }))
    })

    it ('should increment on INCREMENT_COUNTER_IF_ODD when counter is odd', () => {
        const state = Map ({ value : 1 })
        const new_state = counter (state, { type: INCREMENT_COUNTER_IF_ODD })
        expect (new_state).to.equal (fromJS ({
            value: 2
        }))
    })

    it ('should not increment on INCREMENT_COUNTER_IF_ODD when counter is even', () => {
        const state = Map ({ value : 2 })
        const new_state = counter (state, { type: INCREMENT_COUNTER_IF_ODD })
        expect (new_state).to.equal (fromJS ({
            value: 2
        }))
    })
})
