'use strict';

import React from 'react'
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
    })
  })
});
