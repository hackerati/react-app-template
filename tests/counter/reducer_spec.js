'use strict'

import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import counter from '../../src/reducers/counter'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../src/constants/ActionTypes';

describe ('Counter reducer', () => {
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
})
