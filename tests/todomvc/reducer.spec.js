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
  });

  it('Should handle TOGGLE_COMPLETE_ALL todo', () => {
    const state = List([
      Map({id: uuid.v4(), description: 'My todo 1', completed: false}),
      Map({id: uuid.v4(), description: 'My todo 2', completed: true}),
      Map({id: uuid.v4(), description: 'My todo 3', completed: false}),
      Map({id: uuid.v4(), description: 'My todo 4', completed: true}),
      Map({id: uuid.v4(), description: 'My todo 5', completed: false})
    ]);

    const new_state_1 = todomvc.reducer(state, {
      type: todomvc.types.TOGGLE_COMPLETE_ALL, all_completed: true
    });

    expect(new_state_1.size).to.equal(5);
    new_state_1.map(todo => expect(todo.get('completed')).to.equal(true));

    const new_state_2 = todomvc.reducer(state, {
      type: todomvc.types.TOGGLE_COMPLETE_ALL, all_completed: false
    });

    expect(new_state_2.size).to.equal(5);
    new_state_2.map(todo => expect(todo.get('completed')).to.equal(false))
  });

  it('Should handle DELETE_COMPLETED todo', () => {
    const state = List([
      Map({id: uuid.v4(), description: 'My todo', completed: false}),
      Map({id: uuid.v4(), description: 'My soon to be deleted todo 1', completed: true}),
      Map({id: uuid.v4(), description: 'My soon to be deleted todo 2', completed: true}),
      Map({id: uuid.v4(), description: 'My soon to be deleted todo 3', completed: true})
    ]);
    const new_state = todomvc.reducer(state, {
      type: todomvc.types.DELETE_COMPLETED
    });

    expect(new_state.size).to.equal(1);
    expect(new_state.get(0)).to.equal(state.get(0))
  })
});
