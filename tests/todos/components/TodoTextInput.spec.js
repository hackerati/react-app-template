'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'

function setup (propOverrides) {
  const props = Object.assign({
    onSave: sinon.spy (),
    text: 'my task',
    placeholder: 'do it',
    isNew: false,
    style: {},
  }, propOverrides)

  const component = shallow (
    <TodoTextInput {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('TodoTextInput component', () => {
  describe ('Should render correctly', () => {
    it ('should be a TodoTextInput component', () => {
      const { component } = setup ()
      expect(component.find('input')).to.have.length(1)
      expect(component.find('input').at(0).prop('placeholder')).to.equal('do it')
      expect(component.find('input').at(0).prop('value')).to.equal('my task')
    })
  })

  describe ('Should behave correctly', () => {
    it ('should update value on change', () => {
      const { props, component } = setup ()
      component.find('input').at(0).simulate ('change', { target: { value: 'task' }})
      expect(component.find('input').at(0).prop('value')).to.equal('task')
    })

    it ('should call onSave on return key press', () => {
      const { props, component } = setup ()
      component.find('input').at(0).simulate ('keydown', { which: 13, // RETURN KEY
                                                           target: {
                                                             value: 'new task'
                                                           }})
      expect(props.onSave.called).to.be.true
      expect(props.onSave.args[0][0]).to.equal('new task')
    })

    it('should reset state on return key press if newTodo', () => {
      const { props, component } = setup ({ isNew: true })
      component.find('input').at(0).simulate ('keydown', { which: 13, // RETURN KEY
                                                           target: {
                                                             value: 'new task'
                                                           }})
      expect(component.find('input').at(0).prop('value')).to.equal('')
    })

    it ('should call onSave on blur', () => {
      const { props, component } = setup ()
      component.find('input').at(0).simulate ('blur', { target: { value: 'new task' }})
      expect(props.onSave.called).to.be.true
      expect(props.onSave.args[0][0]).to.equal('new task')
    })

    it ('shouldnt call onSave on blur if newTodo', () => {
      const { props, component } = setup ({ isNew: true })
      component.find('input').at(0).simulate ('blur', { target: { value: 'new task' }})
      expect(props.onSave.called).to.be.false
    })
  })
})
