'use strict';

import React from 'react'
import {Map, List} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import sinon from 'sinon'

import MainSection from '../../../src/todomvc/components/MainSection'
import TodoItem from '../../../src/todomvc/components/TodoItem'

const defaultProps = {
  todo: Map({id: uuid.v4(), description: 'Use Redux', completed: false}),
  editTodo: sinon.spy(),
  deleteTodo: sinon.spy(),
  toggleCompleteOneTodo: sinon.spy()
};

const completedProps = {
  todo: Map({id: uuid.v4(), description: 'Use Redux', completed: true}),
  editTodo: sinon.spy(),
  deleteTodo: sinon.spy(),
  toggleCompleteOneTodo: sinon.spy()
};

function setup(props = defaultProps) {
  const component = shallow(
    <TodoItem {...props} />
  );

  return {
    component: component,
    props: props
  }
}

function setupMainSection() {
  const props = {
    todos: List([
      Map({id: uuid.v4(), description: 'Use Redux', completed: false}),
      Map({id: uuid.v4(), description: 'Use Redux 2', completed: true}),
      Map({id: uuid.v4(), description: 'Use Redux 3', completed: true})
    ]),
    actions: {
      editTodo: sinon.spy(),
      deleteTodo: sinon.spy(),
      toggleCompleteOneTodo: sinon.spy(),
      deleteCompletedTodos: sinon.spy()
    }
  };

  return mount(
    <MainSection {...props} />
  )
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
      const {component} = setup();
      const div = component.children('div');

      expect(div).to.have.length(1);
      expect(div.children().text()).to.equal('x')
    });

    it('Should have a toggle complete status checkbox', () => {
      const {component} = setup();
      const svg = component.children('svg');

      expect(svg).to.have.length(1);
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
      const {component} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode
      component.find('TodoTextInput').props().onSave('Use Redux'); // update
      component.update(); // force component to re-render
      expect(component.children('label')).to.have.length(1) // switched back to label
    });

    it('Should call deleteTodo() when the delete button is clicked', () => {
      const {component, props} = setup();
      const div = component.find('div');

      div.simulate('click');
      expect(props.deleteTodo.called).to.be.true
    });

    it('Should call deleteTodo() when TodoTextInput onSave is called with no text', () => {
      const {component, props} = setup();

      component.children('label').simulate('doubleclick'); // switch to edit mode
      component.find('TodoTextInput').props().onSave('');
      expect(props.deleteTodo.called).to.be.true
    });

    it('Should call toggleCompleteOneTodo() when the complete status checkbox is changed', () => {
      const {component, props} = setup();
      const svg = component.find('svg');

      svg.simulate('click');
      expect(props.toggleCompleteOneTodo.called).to.be.true
    })
  });

  describe('Should be styled correctly', () => {
    it('Should have li styling applied in accordance with the design specs', () => {
      const componentMainSection = setupMainSection();
      const items = componentMainSection.find('ul').children();

      expect(items.find({style: {position: 'relative'}})).to.have.length(3);
      expect(items.find({style: {fontSize: 20}})).to.have.length(3);
      expect(items.find({style: {borderBottom: '1px solid #ededed'}})).to.have.length(2);
      expect(items.find({style: {borderBottom: 'none'}})).to.have.length(1);
    });

    it('Should have ButtonChecked styling applied in accordance with the design specs', () => {
      const {component} = setup(completedProps);
      const checkbox = component.children('svg');

      expect(checkbox.find({style: {top: 0}})).to.have.length(1);
      expect(checkbox.find({style: {bottom: 0}})).to.have.length(1);
      expect(checkbox.find({style: {height: 'auto'}})).to.have.length(1);
      expect(checkbox.find({style: {width: 40}})).to.have.length(1);
      expect(checkbox.find({style: {textAlign: 'center'}})).to.have.length(1);
      expect(checkbox.find({style: {position: 'absolute'}})).to.have.length(1);
      expect(checkbox.find({style: {margin: 'auto 0'}})).to.have.length(1);
    });

    it('Should have ButtonUnchecked styling applied in accordance with the design specs', () => {
      const {component} = setup();
      const checkbox = component.children('svg');

      expect(checkbox.find({style: {top: 0}})).to.have.length(1);
      expect(checkbox.find({style: {bottom: 0}})).to.have.length(1);
      expect(checkbox.find({style: {height: 'auto'}})).to.have.length(1);
      expect(checkbox.find({style: {width: 40}})).to.have.length(1);
      expect(checkbox.find({style: {textAlign: 'center'}})).to.have.length(1);
      expect(checkbox.find({style: {position: 'absolute'}})).to.have.length(1);
      expect(checkbox.find({style: {margin: 'auto 0'}})).to.have.length(1);
    });

    it('Should have label not completed styling applied in accordance with the design specs', () => {
      const {component} = setup();
      const label = component.children('label');

      expect(label.find({style: {wordBreak: 'break-all'}})).to.have.length(1);
      expect(label.find({style: {padding: '15px 60px 15px 15px'}})).to.have.length(1);
      expect(label.find({style: {marginLeft: 45}})).to.have.length(1);
      expect(label.find({style: {display: 'block'}})).to.have.length(1);
      expect(label.find({style: {lineHeight: 1}})).to.have.length(1);
      expect(label.find({style: {transition: 'color 0.4s'}})).to.have.length(1);
    });

    it('Should have label completed styling applied in accordance with the design specs', () => {
      const {component} = setup(completedProps);
      const label = component.children('label');

      expect(label.find({style: {wordBreak: 'break-all'}})).to.have.length(1);
      expect(label.find({style: {padding: '15px 60px 15px 15px'}})).to.have.length(1);
      expect(label.find({style: {marginLeft: 45}})).to.have.length(1);
      expect(label.find({style: {display: 'block'}})).to.have.length(1);
      expect(label.find({style: {lineHeight: 1}})).to.have.length(1);
      expect(label.find({style: {transition: 'color 0.4s'}})).to.have.length(1);
      expect(label.find({style: {color: '#d9d9d9'}})).to.have.length(1);
      expect(label.find({style: {textDecoration: 'line-through'}})).to.have.length(1);
    });

    it('Should have delete div styling applied in accordance with the design specs', () => {
      const {component} = setup();
      const div = component.children('div');

      expect(div.find({style: {position: 'absolute'}})).to.have.length(1);
      expect(div.find({style: {top: 16}})).to.have.length(1);
      expect(div.find({style: {right: 0}})).to.have.length(1);
      expect(div.find({style: {bottom: 0}})).to.have.length(1);
      expect(div.find({style: {width: 40}})).to.have.length(1);
      expect(div.find({style: {height: 40}})).to.have.length(1);
      expect(div.find({style: {fontSize: 30}})).to.have.length(1);
      expect(div.find({style: {color: '#cc9a9a'}})).to.have.length(1);
      expect(div.find({style: {cursor: 'pointer'}})).to.have.length(1);
      expect(div.find({style: {margin: 'auto 0'}})).to.have.length(1);
      expect(div.find({style: {transition: 'color 0.2s ease-out'}})).to.have.length(1);
    });

    it('Should not display delete div initially', () => {
      const {component} = setup();
      const div = component.children('div');

      expect(div.find({style: {position: 'absolute'}})).to.have.length(1);
      expect(div.find({style: {top: 16}})).to.have.length(1);
      expect(div.find({style: {right: 0}})).to.have.length(1);
      expect(div.find({style: {bottom: 0}})).to.have.length(1);
      expect(div.find({style: {width: 40}})).to.have.length(1);
      expect(div.find({style: {height: 40}})).to.have.length(1);
      expect(div.find({style: {fontSize: 30}})).to.have.length(1);
      expect(div.find({style: {color: '#cc9a9a'}})).to.have.length(1);
      expect(div.find({style: {cursor: 'pointer'}})).to.have.length(1);
      expect(div.find({style: {margin: 'auto 0'}})).to.have.length(1);
      expect(div.find({style: {transition: 'color 0.2s ease-out'}})).to.have.length(1);
      expect(div.find({style: {display: 'none'}})).to.have.length(1);
    })
  })
});
