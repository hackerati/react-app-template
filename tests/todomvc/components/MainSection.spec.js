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
      Map({id: uuid.v4(), description: 'Run the tests', completed: false})
    ]),
    actions: {
      editTodo: sinon.spy(),
      deleteTodo: sinon.spy(),
      toggleCompleteOneTodo: sinon.spy()
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
      const {component, props} = setup();
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
  })
});
