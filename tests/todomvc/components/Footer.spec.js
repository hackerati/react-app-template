'use strict';

import React from 'react'
import {List, Map} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Footer from '../../../src/todomvc/components/Footer'

function setup(todos) {
  const props = {
    todos: todos
  };

  const component = shallow(
    <Footer {...props} />
  );

  return {
    component: component
  }
}

describe('Footer component', () => {
  describe('Should render correctly', () => {
    it('Should be a Footer', () => {
      const {component} = setup();

      expect(component.type()).to.equal('footer')
    });

    it('Should have a todo counter', () => {
      const {component} = setup();
      const label = component.children('label');

      expect(label.type()).to.equal('label');
      expect(label.text()).to.equal('The number of todos not completed: ')
    });

    it('Should display \'No todos left\' when active count is 0', () => {
      const {component} = setup(List([]));
      const label = component.children('label');

      expect(label.type()).to.equal('label');
      expect(label.text()).to.equal('The number of todos not completed: No todos left')
    });

    it('Should display \'1 todo left\' when active count is 1', () => {
      const todos = List([Map({id: uuid.v4(), description: 'todo 1', completed: false})]);
      const {component} = setup(todos);
      const label = component.children('label');

      expect(label.type()).to.equal('label');
      expect(label.text()).to.equal('The number of todos not completed: 1 todo left')
    })
  })
});
