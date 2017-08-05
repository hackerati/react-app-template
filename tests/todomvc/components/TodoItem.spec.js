'use strict';

import React from 'react'
import {Map} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import TodoItem from '../../../src/todomvc/components/TodoItem'

function setup() {
  const props = {
    todo: Map({id: uuid.v4(), description: 'Use Redux', completed: false})
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
    })
  });

  describe('Should behave correctly', () => {
    it('Should switch to edit mode when label onDoubleClick is fired', () => {
      const {component} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode

      const input = component.find('TodoTextInput');

      expect(input).to.have.length(1);
      expect(input.prop('text')).to.equal('Use Redux')
    })
  })
});
