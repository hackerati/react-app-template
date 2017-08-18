'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import TodoTextInput from '../../../src/todomvc/components/TodoTextInput'

function setup(propOverrides) {
  const props = Object.assign({
    text: 'my todo',
    placeholder: 'do it',
    onSave: sinon.spy(),
    isNew: false
  }, propOverrides);
  const component = shallow(
    <TodoTextInput {...props} />
  );

  return {
    props: props,
    component: component
  }
}

describe('TodoTextInput component', () => {
  describe('Should render correctly', () => {
    it('Should be a TodoTextInput component', () => {
      const {props, component} = setup();

      expect(component.find('input')).to.have.length(1);
      expect(component.find('input').at(0).prop('placeholder')).to.equal(props.placeholder);
      expect(component.find('input').at(0).prop('value')).to.equal(props.text)
    })
  });

  describe('Should behave correctly', () => {
    it('Should update value on change', () => {
      const {component} = setup();

      component.find('input').at(0).simulate('change', {target: {value: 'todo'}});
      expect(component.find('input').at(0).prop('value')).to.equal('todo')
    });

    it('Should call onSave() on return key press', () => {
      const {props, component} = setup();

      component.find('input').at(0).simulate('keydown', {
        which: 13, // RETURN KEY
        target: {value: 'new todo'}
      });
      expect(props.onSave.called).to.be.true;
      expect(props.onSave.args[0][0]).to.equal('new todo')
    });

    it('Should reset state on return key press if isNew', () => {
      const {component} = setup({isNew: true});

      component.find('input').at(0).simulate('keydown', {
        which: 13, // RETURN KEY
        target: {value: 'new todo'}
      });
      expect(component.find('input').at(0).prop('value')).to.equal('')
    });

    it('Should call onSave() on blur if not isNew', () => {
      const {props, component} = setup();

      component.find('input').at(0).simulate('blur', {target: {value: 'new todo'}});
      expect(props.onSave.called).to.be.true;
      expect(props.onSave.args[0][0]).to.equal('new todo')
    });

    it('Should not call onSave() on blur if isNew', () => {
      const {props, component} = setup({isNew: true});

      component.find('input').at(0).simulate('blur', {target: {value: 'new todo'}});
      expect(props.onSave.called).to.be.false;
    })
  });

  describe('Should be styled correctly', () => {
    it('Should have new todo styling applied in accordance with the design specs', () => {
      const {component} = setup({isNew: true});
      let newTodo = component.find('input');

      expect(newTodo.find({style: {border: 'none'}})).to.have.length(1);
      expect(newTodo.find({style: {boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)'}})).to.have.length(1);
      expect(newTodo.find({style: {color: 'inherit'}})).to.have.length(1);
      expect(newTodo.find({style: {display: 'block'}})).to.have.length(1);
      expect(newTodo.find({style: {fontSize: 24}})).to.have.length(1);
      expect(newTodo.find({style: {lineHeight: '1.4em'}})).to.have.length(1);
      expect(newTodo.find({style: {padding: '16px 16px 16px 60px'}})).to.have.length(1);
      expect(newTodo.find({style: {width: '100%'}})).to.have.length(1);
      expect(newTodo.find({style: {WebkitFontSmoothing: 'antialiased'}})).to.have.length(1);
      expect(newTodo.find({style: {MozOsxFontSmoothing: 'grayscale'}})).to.have.length(1);
    });

    it('Should have edit todo styling applied in accordance with the design specs', () => {
      const {component} = setup();
      let editTodo = component.find('input');

      expect(editTodo.find({style: {border: '1px solid #999'}})).to.have.length(1);
      expect(editTodo.find({style: {boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)'}})).to.have.length(1);
      expect(editTodo.find({style: {color: 'inherit'}})).to.have.length(1);
      expect(editTodo.find({style: {display: 'block'}})).to.have.length(1);
      expect(editTodo.find({style: {fontSize: 24}})).to.have.length(1);
      expect(editTodo.find({style: {lineHeight: '1.4em'}})).to.have.length(1);
      expect(editTodo.find({style: {marginLeft: 40}})).to.have.length(1);
      expect(editTodo.find({style: {padding: '12px 16px'}})).to.have.length(1);
      expect(editTodo.find({style: {width: 500}})).to.have.length(1);
      expect(editTodo.find({style: {WebkitFontSmoothing: 'antialiased'}})).to.have.length(1);
      expect(editTodo.find({style: {MozOsxFontSmoothing: 'grayscale'}})).to.have.length(1);
    })
  })
});
