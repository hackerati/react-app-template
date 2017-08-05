'use strict';

import {expect} from 'chai'

import todomvc from '../../src/todomvc'

describe('TodoMVC actions', () => {
  it('Should create an action to add a todo', () => {
    const description = 'My todo';
    const expectedAction = {
      type: 'todomvc/ADD', description: description, completed: false
    };

    expect(todomvc.actions.addTodo(description)).to.deep.equal(expectedAction)
  });

  it('Should create an action to edit a todo', () => {
    const description = 'My todo';
    const expectedAction = {
      type: 'todomvc/EDIT', id: 'my_id', description: description
    };

    expect(todomvc.actions.editTodo('my_id', description)).to.deep.equal(expectedAction)
  })
});
