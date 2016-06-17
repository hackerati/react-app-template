'use strict'

import { expect } from 'chai'
import { List, fromJS } from 'immutable'

import todos from '../../src/todos'

describe ('Todos reducer', () => {
    it ('should handle initial state', () => {
        const state = todos.reducer (undefined, {})
        expect (state).to.equal (fromJS ([]))
    })

    it ('should handle ADD task', () => {
        const state = List ([])
        const new_state = todos.reducer (state, { type: todos.types.ADD,
                                                  description: 'My task',
                                                  completed: false })
        expect (new_state).to.equal (fromJS ([
            {
                description: 'My task',
                completed: false
            }
        ]))
    })
})
