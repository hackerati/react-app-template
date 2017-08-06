'use strict';

import React from 'react'
import {List, Map} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import MainSection from '../../../src/todomvc/components/MainSection'
import TodoItem from '../../../src/todomvc/components/TodoItem'

function setup() {
  const props = {
    todos: List([
      Map({id: uuid.v4(), description: 'Use Redux', completed: false}),
      Map({id: uuid.v4(), description: 'Use Redux 2', completed: true}),
      Map({id: uuid.v4(), description: 'Use Redux 3', completed: true}),
      Map({id: uuid.v4(), description: 'Use Redux 4', completed: false}),
      Map({id: uuid.v4(), description: 'Run the tests', completed: false})
    ]),
    actions: {
      editTodo: sinon.spy(),
      deleteTodo: sinon.spy(),
      toggleCompleteOneTodo: sinon.spy(),
      deleteCompletedTodos: sinon.spy()
    }
  };

  const component = shallow(
    <MainSection {...props} />
  );

  return {
    component: component,
    props: props
  }
}

describe('MainSection component', () => {
  describe('Should render correctly', () => {
    it('Should be a MainSection component', () => {
      const {component} = setup();

      expect(component.type()).to.equal('section')
    });

    it('Should include a list of todos', () => {
      const {component, props} = setup();
      const ul = component.children('ul');
      const items = ul.children();

      expect(ul).to.have.length(1);
      expect(items).to.have.length(props.todos.size);
      items.forEach((item, i) => {
        expect(item.type()).to.equal(TodoItem);
        expect(item.props().todo).to.equal(props.todos.get(i))
      })
    });

    it('Should include a Footer component', () => {
      const {component} = setup();
      const footer = component.children('Footer');

      expect(footer).to.have.length(1);
    });

    it('Should include a completed radio-button filter', () => {
      const {component} = setup();
      const radio_buttons = component.children('input');

      expect(radio_buttons).to.have.length(3);
      radio_buttons.map(radio_button => expect(radio_button.props().type).to.equal('radio'));
      radio_buttons.map(radio_button => expect(radio_button.props().name).to.equal('complete_status'));
      expect(radio_buttons.nodes[0].props.value).to.equal('show_all');
      expect(radio_buttons.nodes[1].props.value).to.equal('show_completed');
      expect(radio_buttons.nodes[2].props.value).to.equal('show_not_completed')
    })
  });

  describe('Should behave correctly', () => {
    it('Should show the filtered list of Todos', () => {
      const {component} = setup();
      let todos = component.children('ul').children().nodes;
      const radio_button_all = component.find('#id_show_all');
      const radio_button_completed = component.find('#id_show_completed');
      const radio_button_not_completed = component.find('#id_show_not_completed');

      let and_result = true;
      let or_result = false;
      expect(todos).to.have.length(5);
      todos.map(todo => {
        expect([true, false]).to.include(todo.props.todo.get('completed'));
        and_result = and_result && todo.props.todo.get('completed');
        or_result = or_result || todo.props.todo.get('completed')
      });
      expect(and_result).to.equal(false);
      expect(or_result).to.equal(true);

      radio_button_completed.simulate('change', {target: {value: 'show_completed'}});
      todos = component.children('ul').children().nodes;
      expect(todos).to.have.length(2);
      todos.map(todo => expect([true]).to.include(todo.props.todo.get('completed')));

      radio_button_not_completed.simulate('change', {target: {value: 'show_not_completed'}});
      todos = component.children('ul').children().nodes;
      expect(todos).to.have.length(3);
      todos.map(todo => expect([false]).to.include(todo.props.todo.get('completed')));

      and_result = true;
      or_result = false;
      radio_button_all.simulate('change', {target: {value: 'show_all'}});
      todos = component.children('ul').children().nodes;
      expect(todos).to.have.length(5);
      todos.map(todo => {
        expect([true, false]).to.include(todo.props.todo.get('completed'));
        and_result = and_result && todo.props.todo.get('completed');
        or_result = or_result || todo.props.todo.get('completed')
      });
      expect(and_result).to.equal(false);
      expect(or_result).to.equal(true)
    })
  })
});
