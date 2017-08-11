'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import Header from '../../../src/todomvc/components/Header'
import TodoTextInput from '../../../src/todomvc/components/TodoTextInput'

function setup() {
  const props = {
    actions: {
      addTodo: sinon.spy(),
      toggleCompleteAllTodos: sinon.spy()
    }
  };

  const component = shallow(
    <Header {...props} />
  );

  return {
    component: component,
    props: props
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
    });

    it('Should have a toggle all complete status checkbox', () => {
      const {component} = setup();
      const checkbox = component.children('input');

      expect(checkbox).to.have.length(1);
      expect(checkbox.props().type).to.equal('checkbox');
      expect(checkbox.props().name).to.equal('all_completed')
    })
  });

  describe('Should behave correctly', () => {
    it('Should call addTodo() if length of text is greater than 0', () => {
      const {component, props} = setup();
      const input = component.children(TodoTextInput);

      input.props().onSave('');
      expect(props.actions.addTodo.called).to.be.false;
      input.props().onSave('Use Redux');
      expect(props.actions.addTodo.called).to.be.true
    });

    it('Should call toggleCompleteAllTodos() when the all complete status checkbox is changed', () => {
      const {component, props} = setup();
      const input = component.find('input');

      input.simulate('change');
      expect(props.actions.toggleCompleteAllTodos.called).to.be.true
    })
  });

  describe('Should be styled correctly', () => {
    it('Should have header styling applied in accordance with the design specs', () => {
      const {component} = setup();

      expect(component.find({style: {height: 110}})).to.have.length(1);
    })
  })
});
