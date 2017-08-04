'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import TodoItem from '../../../src/todomvc/components/TodoItem'

function setup() {
  const component = shallow(
    <TodoItem/>
  );

  return {
    component: component
  }
}

describe('TodoItem component', () => {
  describe('Should render correctly', () => {
    it('Should be an li', () => {
      const {component} = setup();

      expect(component.type()).to.equal('li')
    })
  })
});
