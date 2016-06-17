'use strict'

import { expect } from 'chai'
import { fromJS } from 'immutable'

import todos from '../../src/todos'

describe ('Todos reducer', () => {
    it ('should handle initial state', () => {
        const state = todos.reducer (undefined, {})
        expect (state).to.equal (fromJS ([]))
    })

    it ('should handle ADD task')
})
