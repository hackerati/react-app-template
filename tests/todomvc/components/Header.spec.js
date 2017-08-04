'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Header from '../../../src/todomvc/components/Header'
import TodoTextInput from '../../../src/todomvc/components/TodoTextInput'

function setup() {
  const component = shallow(
    <Header/>
  );

  return {
    component: component
  }
}

describe('Header component', () => {
  describe('Should render correctly', () => {
    it('Should be a Header', () => {
      const {component} = setup();

      expect(component.type()).to.equal('header')
    });

    it('Should have a title', () => {
      const {component} = setup();
      const h1 = component.children('h1');

      expect(h1.type()).to.equal('h1');
      expect(h1.text()).to.equal('todos')
    });

    it('Should have a TodoTextInput field', () => {
      const {component} = setup();
      const input = component.children(TodoTextInput);

      expect(input.type()).to.equal(TodoTextInput);
      expect(input.props().placeholder).to.equal('What needs to be done?');
      expect(input.props().isNew).to.equal(true)
    })
  })
});
