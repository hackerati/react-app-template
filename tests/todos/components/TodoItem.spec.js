'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import TodoItem from '../../../src/todos/components/TodoItem'

function setup () {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false,
    },
    completeTodo: sinon.spy (),
    deleteTodo: sinon.spy (),
    editTodo: sinon.spy (),
  }
  const component = shallow (
    <TodoItem {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('TodoItem component', () => {
  it ('should render correctly', () => {
    const { component } = setup ()
    expect(component.type()).to.equal('li')
    const div = component.children('div')
    expect(div).to.have.length(1)
    expect(div.children('input')).to.have.length(1)
    expect(div.children('input').prop('checked')).to.be.false
    expect(div.children('label')).to.have.length(1)
    expect(div.children('label').children().text()).to.equal('Use Redux')
    expect(div.children('button')).to.have.length(1)
  })

  it ('should call completeTodo() when input onChange is fired', () => {
    const { component, props } = setup()
    const input = component.find ('input')
    input.simulate ('change')
    expect(props.completeTodo.called).to.be.true
  })

  it ('should call deleteTodo() when button onClick is fired', () => {
    const { component, props } = setup()
    const button = component.find ('button')
    button.simulate ('click')
    expect(props.deleteTodo.called).to.be.true
  })

  it ('should switch to edit mode when label onDoubleClick is fired', () => {
    const { component } = setup()
    const label = component.find ('label')
    label.simulate ('doubleclick')
    expect(component.hasClass('editing')).to.be.true
    const input = component.find ('TodoTextInput')
    expect(input).to.have.length(1)
    expect(input.prop('text')).to.equal('Use Redux')
  })

  it('should call editTodo() when TodoTextInput onSave is called', () => {
    const { component, props } = setup()
    component.find('label').simulate ('doubleclick') // switch to edit mode
    component.find('TodoTextInput').props().onSave('Use Redux')
    expect(props.editTodo.called).to.be.true
  })
  
  it ('should call deleteTodo() when TodoTextInput onSave is called empty', () => {
    const { component, props } = setup()
    component.find('label').simulate ('doubleclick') // switch to edit mode
    component.find('TodoTextInput').props().onSave('')
    expect(props.deleteTodo.called).to.be.true
  })
})
