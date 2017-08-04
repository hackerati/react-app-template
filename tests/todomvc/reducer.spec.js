'use strict';

import {expect} from 'chai'
import {fromJS} from 'immutable'

import todomvc from '../../src/todomvc'

describe('TodoMVC reducer', () => {
  it('Should handle initial state', () => {
    const state = todomvc.reducer(undefined, {});

    expect(state).to.equal(fromJS([]))
  })
});
