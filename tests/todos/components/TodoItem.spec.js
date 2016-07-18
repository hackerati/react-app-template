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
  describe ('Should render correctly', () => {
    it ('should be an li', () => {
      const { component } = setup ()
      expect(component.type()).to.equal('li')
      expect(component.children()).to.have.length(2)
    })

    it ('should have a button', () => {
      const { component } = setup ()
      const button = component.children('svg')
      expect(button).to.have.length(1)
    })

    it ('should have a label', () => {
      const { component } = setup ()
      const label = component.children('label')
      expect(label).to.have.length(1)
      expect(label.children().text()).to.equal('Use Redux')
    })
  })

  describe ('Should behave correctly', () => {
    it ('should call complete() when the complete button is clicked', () => {
      const { component, props } = setup()
      const button = component.children('svg')
      button.simulate ('click')
      expect(props.complete.called).to.be.true
    })

    it ('should call del() when the delete button is clicked')
    // how to trigger li hover state to show the delete button?

    it ('should switch to edit mode when label onDoubleClick is fired', () => {
      const { component } = setup()
      component.children('label').simulate ('doubleclick') // switch to edit mode
      const input = component.find ('TodoTextInput')
      expect(input).to.have.length(1)
      expect(input.prop('text')).to.equal('Use Redux')
    })

    it ('should call edit() when TodoTextInput onSave is called', () => {
      const { component, props } = setup()
      component.children('label').simulate ('doubleclick') // switch to edit mode
      component.find('TodoTextInput').props().onSave('Use Redux')
      expect(props.edit.called).to.be.true
    })
  
    it ('should call del() when TodoTextInput onSave is called empty', () => {
      const { component, props } = setup()
      component.children('label').simulate ('doubleclick') // switch to edit mode
      component.find('TodoTextInput').props().onSave('')
      expect(props.del.called).to.be.true
    })

    it ('should leave edit mode after TodoTextInput onSave', () => {
      const { component, props } = setup()
      component.children('label').simulate ('doubleclick') // switch to edit mode
      component.find('TodoTextInput').props().onSave('Use Redux') // update
      component.update() // force component to re-render
      expect(component.children('label')).to.have.length(1) // switched back to label
    })
  })
})
