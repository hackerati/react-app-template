'use strict'

import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import uuid from 'uuid'

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
        expect(new_state.first().filterNot((v, k) => k === 'id')).to.equal(fromJS ( // skip id field
            {
                description: 'My task',
                completed: false
            }
        ))
    })

    it ('should handle EDIT task', () => {
        const state = List ([
          Map ({ id: uuid.v4(), description: 'My task', completed: false }),
          Map ({ id: uuid.v4(), description: 'My next task', completed: false })
        ])
        const new_state = todos.reducer (state, { type: todos.types.EDIT,
                                                  id: state.get(1).get('id'),
                                                  description: 'My updated task' })
        expect (new_state.size).to.equal(2)
        expect (new_state.get(0)).to.equal(state.get(0))
        expect (new_state.get(1).get('id')).to.equal(state.get(1).get('id'))
        expect (new_state.get(1).get('description')).to.equal('My updated task')
        expect (new_state.get(1).get('completed')).to.equal(state.get(1).get('completed'))
    })

    it ('should handle DELETE task', () => {
        const state = List ([
          Map ({ id: uuid.v4(), description: 'My task', completed: false }),
          Map ({ id: uuid.v4(), description: 'My next task', completed: false })
        ])
        const new_state = todos.reducer (state, { type: todos.types.DELETE, id: state.get(1).get('id')})
        expect (new_state.size).to.equal(1)
        expect (new_state.get(0)).to.equal(state.get(0))
    })

    it ('should handle COMPLETE task', () => {
        const state = List ([
          Map ({ id: uuid.v4(), description: 'My task', completed: false }),
          Map ({ id: uuid.v4(), description: 'My next task', completed: false })
        ])
        const new_state = todos.reducer (state, { type: todos.types.COMPLETE,
                                                  id: state.get(1).get('id') })
        expect (new_state.size).to.equal(2)
        expect (new_state.get(0)).to.equal(state.get(0))
        expect (new_state.get(1).get('id')).to.equal(state.get(1).get('id'))
        expect (new_state.get(1).get('description')).to.equal(state.get(1).get('description'))
        expect (new_state.get(1).get('completed')).to.equal(!state.get(1).get('completed'))
        const new_state1 = todos.reducer (new_state, { type: todos.types.COMPLETE,
                                                       id: state.get(1).get('id') })
        expect (new_state1.get(1).get('completed')).to.equal(state.get(1).get('completed'))
    })

    it ('should handle COMPLETE_ALL task', () => {
        const state = List ([
          Map ({ id: uuid.v4(), description: 'My task', completed: true }),
          Map ({ id: uuid.v4(), description: 'My next task', completed: false })
        ])
        const new_state = todos.reducer (state, { type: todos.types.COMPLETE_ALL }) // all completed
        expect (new_state.get(0).get('completed')).to.equal(true)
        expect (new_state.get(1).get('completed')).to.equal(true)
        const new_state1 = todos.reducer (new_state, { type: todos.types.COMPLETE_ALL }) // none
        expect (new_state1.get(0).get('completed')).to.equal(false)
        expect (new_state1.get(1).get('completed')).to.equal(false)
    })

    it ('should handle CLEAR_COMPLETED task', () => {
        const state = List ([
          Map ({ id: uuid.v4(), description: 'My task', completed: false }),
          Map ({ id: uuid.v4(), description: 'My next task', completed: true })
        ])
        const new_state = todos.reducer (state, { type: todos.types.CLEAR_COMPLETED })
        expect (new_state.size).to.equal(1)
        expect (new_state.get(0)).to.equal(state.get(0))
    })
})
