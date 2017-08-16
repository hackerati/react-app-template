'use strict';

import React from 'react'
import {List, Map} from 'immutable'
import uuid from 'uuid'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import Footer from '../../../src/todomvc/components/Footer'

function setup(todos) {
  const props = {
    todos: todos,
    deleteCompletedTodos: sinon.spy()
  };

  const component = shallow(
    <Footer {...props} />
  );

  return {
    component: component,
    props: props
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
    });

    it('Should display \'5 todos left\' when active count is 5', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: false}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false}),
        Map({id: uuid.v4(), description: 'todo 4', completed: false}),
        Map({id: uuid.v4(), description: 'todo 5', completed: false})
      ]);
      const {component} = setup(todos);
      const label = component.children('label');

      expect(label.type()).to.equal('label');
      expect(label.text()).to.equal('The number of todos not completed: 5 todos left')
    })
  });

  describe('Should behave correctly', () => {
    it('Should not show \'delete completed\' button when there are no completed todos', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: false}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component} = setup(todos);
      const button = component.children('button');

      expect(button).to.have.length(0)
    });

    it('Should show \'delete completed\' button when there is at least one completed todo', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: true}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component} = setup(todos);
      const button = component.children('button');

      expect(button).to.have.length(1);
      expect(button.children().text()).to.equal('delete completed')
    });

    it('Should call deleteCompletedTodos() when the delete completed button is clicked', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: true}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component, props} = setup(todos);
      const button = component.find('button');

      button.simulate('click');
      expect(props.deleteCompletedTodos.called).to.be.true
    })
  });

  describe('Should be styled correctly', () => {
    it('Should have footer styling applied in accordance with the design specs', () => {
      const {component} = setup();

      expect(component.find({style: {color: '#777'}})).to.have.length(1);
      expect(component.find({style: {padding: '10px 15px'}})).to.have.length(1);
      expect(component.find({style: {height: 20}})).to.have.length(1);
      expect(component.find({style: {borderTop: '1px solid #e6e6e6'}})).to.have.length(1);
    });

    it('Should have number of not completed todos in bold', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: true}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component} = setup(todos);
      const strong = component.find('strong');

      expect(strong).to.have.length(1);
      expect(strong.children().text()).to.equal('2 todos left')
    });

    it('Should have delete button styling applied in accordance with the design specs', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: true}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component} = setup(todos);
      const button = component.find('button');

      expect(button.find({style: {float: 'right'}})).to.have.length(1);
      expect(button.find({style: {position: 'relative'}})).to.have.length(1);
      expect(button.find({style: {marginTop: 2}})).to.have.length(1);
      expect(button.find({style: {textDecoration: 'none'}})).to.have.length(1);
      expect(button.find({style: {border: 0}})).to.have.length(1);
      expect(button.find({style: {background: 'none'}})).to.have.length(1);
      expect(button.find({style: {fontSize: '100%'}})).to.have.length(1);
      expect(button.find({style: {color: 'rgba(175, 47, 47, 0.75)'}})).to.have.length(1);
      expect(button.find({style: {cursor: 'pointer'}})).to.have.length(1);
      expect(button.find({style: {WebkitAppearance: 'none'}})).to.have.length(1);
      expect(button.find({style: {WebkitFontSmoothing: 'antialiased'}})).to.have.length(1);
      expect(button.find({style: {MozOsxFontSmoothing: 'grayscale'}})).to.have.length(1);
    });

    it('Should have delete button hover styling applied in accordance with the design specs', () => {
      const todos = List([
        Map({id: uuid.v4(), description: 'todo 1', completed: false}),
        Map({id: uuid.v4(), description: 'todo 2', completed: true}),
        Map({id: uuid.v4(), description: 'todo 3', completed: false})
      ]);
      const {component} = setup(todos);
      let button = component.find('button');

      expect(button.find({style: {fontStyle: 'italic'}})).to.have.length(0);
      expect(button.find({style: {fontWeight: 'bold'}})).to.have.length(0);
      expect(button.find({style: {color: 'indianred'}})).to.have.length(0);

      button.simulate('mouseenter');
      button = component.find('button');
      expect(button.find({style: {fontStyle: 'italic'}})).to.have.length(1);
      expect(button.find({style: {fontWeight: 'bold'}})).to.have.length(1);
      expect(button.find({style: {color: 'indianred'}})).to.have.length(1);

      button.simulate('mouseleave');
      button = component.find('button');
      expect(button.find({style: {fontStyle: 'italic'}})).to.have.length(0);
      expect(button.find({style: {fontWeight: 'bold'}})).to.have.length(0);
      expect(button.find({style: {color: 'indianred'}})).to.have.length(0);
    })
  })
});
