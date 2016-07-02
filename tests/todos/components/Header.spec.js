'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Header from '../../../src/todos/components/Header'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'

function setup () {
  const props = {
    addTodo: sinon.spy ()
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
    it ('should render correctly', () => {
        const { component } = setup ()

        expect(component.type()).to.equal('header')
        expect(component.props().className).to.equal('header')

        const h1 = component.children('h1')
        const input = component.children(TodoTextInput)

        expect(h1.type()).to.equal('h1')
        expect(h1.text()).to.equal('todos')

        expect(input.type()).to.equal(TodoTextInput)
        expect(input.props().newTodo).to.equal(true)
        expect(input.props().placeholder).to.equal('What needs to be done?')
    })

    it ('should call addTodo if length of text is greater than 0', () => {
        const { component, props } = setup ()
        const input = component.children(TodoTextInput)
        input.props().onSave ('')
        expect(props.addTodo.called).to.be.false
        input.props().onSave ('Use Redux')
        expect(props.addTodo.called).to.be.true
    })
})
