'use strict';

import React from 'react'
import {Map} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import TodoItem from '../../../src/todomvc/components/TodoItem'

function setup() {
  const props = {
    todo: Map({id: uuid.v4(), description: 'Use Redux', completed: false}),
    editTodo: sinon.spy(),
    deleteTodo: sinon.spy(),
    toggleCompleteOneTodo: sinon.spy()
  };
  const component = shallow(
    <TodoItem {...props} />
  );

  return {
    component: component,
    props: props
  }
}

describe('TodoItem component', () => {
  describe('Should render correctly', () => {
    it('Should be an li', () => {
      const {component} = setup();

      expect(component.type()).to.equal('li')
    });

    it('Should have a label', () => {
      const {component, props} = setup();
      const label = component.children('label');

      expect(label).to.have.length(1);
      expect(label.children().text()).to.equal(props.todo.get('description'))
    });

    it('Should have a delete button', () => {
      const {component, props} = setup();
      const button = component.children('button');

      expect(button).to.have.length(1);
      expect(button.children().text()).to.equal('delete todo')
    });

    it('Should have a toggle complete status checkbox', () => {
      const {component, props} = setup();
      const checkbox = component.children('input');

      expect(checkbox).to.have.length(1);
      expect(checkbox.props().type).to.equal('checkbox');
      expect(checkbox.props().name).to.equal('completed')
    })
  });

  describe('Should behave correctly', () => {
    it('Should switch to edit mode when label onDoubleClick is fired', () => {
      const {component} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode

      const input = component.find('TodoTextInput');

      expect(input).to.have.length(1);
      expect(input.prop('text')).to.equal('Use Redux')
    });

    it('Should call editTodo() when TodoTextInput onSave is called', () => {
      const {component, props} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode
      component.find('TodoTextInput').props().onSave('Use Redux');
      expect(props.editTodo.called).to.be.true
    });

    it('Should leave edit mode after TodoTextInput onSave', () => {
      const {component, props} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode
      component.find('TodoTextInput').props().onSave('Use Redux'); // update
      component.update(); // force component to re-render
      expect(component.children('label')).to.have.length(1) // switched back to label
    });

    it('Should call deleteTodo() when the delete button is clicked', () => {
      const {component, props} = setup();
      const button = component.find('button');

      button.simulate('click');
      expect(props.deleteTodo.called).to.be.true
    });

    it('Should call deleteTodo() when TodoTextInput onSave is called empty', () => {
      const {component, props} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode
      component.find('TodoTextInput').props().onSave('');
      expect(props.deleteTodo.called).to.be.true
    });

    it('Should call toggleCompleteOneTodo() when the complete status checkbox is changed', () => {
      const {component, props} = setup();
      const input = component.find('input');

      input.simulate('change');
      expect(props.toggleCompleteOneTodo.called).to.be.true
    })
  })
});
