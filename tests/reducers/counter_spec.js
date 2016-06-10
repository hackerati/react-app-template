'use strict'

import {expect} from 'chai'
import {Map, fromJS} from 'immutable'

import counter from '../../src/reducers/counter'
import * as types from '../../src/constants/ActionTypes'

describe ('counter reducer', () => {
    it ('should handle initial state', () => {
        const state = counter (undefined, {})
        expect (state).to.equal (fromJS ({
            value: 0
        }))
    })

    it ('should handle INCREMENT_COUNTER')

    it ('should handle DECREMENT_COUNTER')
})
