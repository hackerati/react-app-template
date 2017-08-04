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
  })
});
