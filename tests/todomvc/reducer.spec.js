'use strict';

import {expect} from 'chai'
import {fromJS, List} from 'immutable'

import todomvc from '../../src/todomvc'

describe('TodoMVC reducer', () => {
  it('Should handle initial state', () => {
    const state = todomvc.reducer(undefined, {});

    expect(state).to.equal(fromJS([]))
  });

  it('Should handle ADD todo', () => {
    const state = List([]);
    const description = 'My todo';
    const new_state = todomvc.reducer(state, {
      type: todomvc.types.ADD, description: description, completed: false
    });

    expect(new_state.first().filterNot((v, k) => k === 'id')).to.equal(fromJS({ // skip uuid id field
      description: description, completed: false
    }))
  })
});
