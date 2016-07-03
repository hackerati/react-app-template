'use strict'

import React from 'react'
import { Map } from 'immutable'
import uuid from 'uuid'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import TodoItem from '../../../src/todos/components/TodoItem'

function setup () {
  const props = {
    todo: Map ({ id: uuid.v4(), description: 'Use Redux', completed: false, }),
    complete: sinon.spy (),
    del: sinon.spy (),
    edit: sinon.spy (),
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

  it ('should call complete() when input onChange is fired', () => {
    const { component, props } = setup()
    const input = component.find ('input')
    input.simulate ('change')
    expect(props.complete.called).to.be.true
  })

  it ('should call del() when button onClick is fired', () => {
    const { component, props } = setup()
    const button = component.find ('button')
    button.simulate ('click')
    expect(props.del.called).to.be.true
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

  it('should call edit() when TodoTextInput onSave is called', () => {
    const { component, props } = setup()
    component.find('label').simulate ('doubleclick') // switch to edit mode
    component.find('TodoTextInput').props().onSave('Use Redux')
    expect(props.edit.called).to.be.true
  })
  
  it ('should call del() when TodoTextInput onSave is called empty', () => {
    const { component, props } = setup()
    component.find('label').simulate ('doubleclick') // switch to edit mode
    component.find('TodoTextInput').props().onSave('')
    expect(props.del.called).to.be.true
  })

  it ('should leave edit mode after TodoTextInput onSave', () => {
    const { component, props } = setup()
    component.find('label').simulate ('doubleclick') // switch to edit mode
    component.find('TodoTextInput').props().onSave('Use Redux') // update
    component.update() // force component to re-render
    expect(component.hasClass('editing')).to.be.false // no longer editing
    expect(component.children('div')).to.have.length(1) // switched back to div
  })
})
