'use strict';

import {expect} from 'chai'
import {fromJS, List, Map} from 'immutable'
import uuid from 'uuid'

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
  });

  it('Should handle EDIT todo', () => {
    const state = List([
      Map({id: uuid.v4(), description: 'My todo', completed: false}),
      Map({id: uuid.v4(), description: 'My next todo', completed: false})
    ]);
    const new_state = todomvc.reducer(state, {
      type: todomvc.types.EDIT,
      id: state.get(1).get('id'),
      description: 'My updated todo'
    });

    expect(new_state.size).to.equal(2);
    expect(new_state.get(0)).to.equal(state.get(0));
    expect(new_state.get(1).get('id')).to.equal(state.get(1).get('id'));
    expect(new_state.get(1).get('description')).to.equal('My updated todo');
    expect(new_state.get(1).get('completed')).to.equal(state.get(1).get('completed'))
  });

  it('Should handle DELETE todo', () => {
    const state = List([
      Map({id: uuid.v4(), description: 'My todo', completed: false}),
      Map({id: uuid.v4(), description: 'My soon to be deleted todo', completed: false})
    ]);
    const new_state = todomvc.reducer(state, {
      type: todomvc.types.DELETE, id: state.get(1).get('id')
    });

    expect(new_state.size).to.equal(1);
    expect(new_state.get(0)).to.equal(state.get(0))
  });

  it('Should handle TOGGLE_COMPLETE_ONE todo', () => {
    const state = List([
      Map({id: uuid.v4(), description: 'My todo', completed: false})
    ]);
    const new_state = todomvc.reducer(state, {
      type: todomvc.types.TOGGLE_COMPLETE_ONE, id: state.get(0).get('id')
    });

    expect(new_state.get(0).get('completed')).to.equal(!state.get(0).get('completed'))
  })
});
