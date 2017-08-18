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
      expect(component.name()).to.equal('StyleRoot');

      const div = component.find('div');
      expect(div.length).to.equal(1)
    });

    it('Should have a header', () => {
      const {component} = setup();
      const div = component.find('div');

      expect(div.children('Header')).to.have.length(1)
    });

    it('Should have a main section', () => {
      const {component} = setup();
      const div = component.find('div');

      expect(div.children('MainSection')).to.have.length(1)
    })
  });

  describe('Should be styled correctly', () => {
    it('Should have styling applied in accordance with the design specs', () => {
      const {component} = setup();
      const div = component.find('div');

      expect(div.find({style: {background: '#fff'}})).to.have.length(1);
      expect(div.find({style: {margin: '130px 0 40px 0'}})).to.have.length(1);
      expect(div.find({style: {position: 'relative'}})).to.have.length(1);
      expect(div.find({style: {boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'}})).to.have.length(1);
    })
  })
});
