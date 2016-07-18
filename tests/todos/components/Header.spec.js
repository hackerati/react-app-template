'use strict'

import React from 'react'
import { List, Map } from 'immutable'
import uuid from 'uuid'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Header from '../../../src/todos/components/Header'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'

function setup () {
  const props = {
    todos: List ([
      Map ({ id: uuid.v4(), description: 'Use Redux', completed: false, }),
      Map ({ id: uuid.v4(), description: 'Run the tests', completed: false, })
    ]),
    actions: {
      add: sinon.spy (),
      completeAll: sinon.spy (),
    }
  }

  const component = shallow (
    <Header {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('Header component', () => {
  describe ('Should render correctly', () => {
    it ('should be a Header', () => {
        const { component } = setup ()
        expect(component.type()).to.equal('header')
    })

    it ('should have a title', () => {
        const { component } = setup ()
        const h1 = component.children('h1')
        expect(h1.type()).to.equal('h1')
        expect(h1.text()).to.equal('todos')
    })

    it ('should include a checkbox to toggle task completion', () => {
      const { component } = setup ()
      const toggle = component.children('div').at(0)
      expect(toggle.text()).to.equal('❯')
    })

    it ('should have a TodoTextInput field', () => {
        const { component } = setup ()
        const input = component.children(TodoTextInput)
        expect(input.type()).to.equal(TodoTextInput)
        expect(input.props().placeholder).to.equal('What needs to be done?')
        expect(input.props().isNew).to.equal(true)
    })
  })

  describe ('Should behave correctly', () => {
    it ('should call completeAll() when the toggle button is clicked', () => {
      const { component, props } = setup ()
      component.children('div').simulate ('click') 
      expect(props.actions.completeAll.called).to.be.true
    })

    it ('should call add() if length of text is greater than 0', () => {
        const { component, props } = setup ()
        const input = component.children(TodoTextInput)
        input.props().onSave ('')
        expect(props.actions.add.called).to.be.false
        input.props().onSave ('Use Redux')
        expect(props.actions.add.called).to.be.true
    })
  })
})
