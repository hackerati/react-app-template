'use strict';

import {expect} from 'chai'
import * as actions from '../../src/counter/actions'
import * as types from '../../src/counter/ActionTypes'

describe('Counter actions', () => {
  it('should create an action to increment the counter', () => {
    const expectedAction = {
      type: types.INCREMENT_COUNTER,
    };
    expect(actions.increment()).to.deep.equal(expectedAction)
  });

  it('should create an action to decrement the counter', () => {
    const expectedAction = {
      type: types.DECREMENT_COUNTER,
    };
    expect(actions.decrement()).to.deep.equal(expectedAction)
  })
});
