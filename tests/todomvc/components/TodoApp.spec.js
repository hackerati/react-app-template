'use strict';

import React from 'react'
import {List} from 'immutable'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import TodoApp from '../../../src/todomvc/components/TodoApp'

function setup() {
  const props = {
    todos: List([]),
    actions: {}
  };

  // Render the wrapped component, passing mocked props, instead of the connected TodoApp
  // component which expects a store. This is the simplest way I could find to test the
  // rendering of both header and main section components without throwing either a
  // missing store error on TodoApp or a missing required prop warning on its child
  // components.
  const component = shallow(
    <TodoApp.WrappedComponent {...props} />
  );

  return {
    component: component
  }
}

describe('TodoApp component', () => {
  describe('Should render correctly', () => {
    it('Should be a TodoApp', () => {
      const {component} = setup();

      expect(component.name()).to.equal('div')
    });

    it('Should have a header', () => {
      const {component, props} = setup();

      expect(component.children('Header')).to.have.length(1)
    });

    it('Should have a main section', () => {
      const {component, props} = setup();

      expect(component.children('MainSection')).to.have.length(1)
    })
  })
});
