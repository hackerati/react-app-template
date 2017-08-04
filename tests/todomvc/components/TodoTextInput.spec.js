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
      const {props, component} = setup();

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
      const {props, component} = setup({isNew: true});

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
  })
});
