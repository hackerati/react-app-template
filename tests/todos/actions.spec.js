'use strict'

import { expect } from 'chai'
import todos from '../../src/todos'

describe ('Todo actions', () => {
    it ('should create an action to add a task', () => {
        const expectedAction = {
          type: todos.types.ADD,
          description: 'My todo',
          completed: false
        }
        expect (todos.actions.add('My todo')).to.deep.equal(expectedAction)
    })

    it ('should create an action to edit a task', () => {
        const expectedAction = {
          type: todos.types.EDIT,
          id: 'my_id',
          description: 'New todo',
        }
        expect(todos.actions.edit('my_id', 'New todo')).to.deep.equal(expectedAction)
    })

    it ('should create an action to delete a task', () => {
        const expectedAction = {
          type: todos.types.DELETE,
          id: 'my_id',
        }
        expect(todos.actions.del('my_id')).to.deep.equal(expectedAction)
    })

    it ('should create an action to toggle a task between completed and not completed')

    it ('should create an action to toggle a filter between completed and not completed')
})
