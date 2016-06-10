'use strict'

import {expect} from 'chai'
import {Map, fromJS} from 'immutable'

import counter from '../../src/reducers/counter'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../src/constants/ActionTypes';

describe ('counter reducer', () => {
    it ('should handle initial state', () => {
        const state = counter (undefined, {})
        expect (state).to.equal (fromJS ({
            value: 0
        }))
    })

    it ('should handle INCREMENT_COUNTER', () => {
        const state = Map ({ value : 0 })
        const new_state = counter (state, INCREMENT_COUNTER)
        expect (new_state).to.equal (fromJS ({
            value: 1
        }))
    })

    it ('should handle DECREMENT_COUNTER', () => {
        const state = Map ({ value : 0 })
        const new_state = counter (state, DECREMENT_COUNTER)
        expect (new_state).to.equal (fromJS ({
            value: -1
        }))
    })
})
