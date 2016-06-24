'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Header from '../../../src/todos/components/Header'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'

function setup () {
  const component = shallow (
    <Header/>
  )

  return {
    component: component,
  }
}

describe ('Header component', () => {
    it ('should render correctly', () => {
        const { component } = setup ()

        expect(component.node.type).to.equal('header')
        expect(component.node.props.className).to.equal('header')

        const [ h1, input ] = component.node.props.children

        expect(h1.type).to.equal('h1')
        expect(h1.props.children).to.equal('todos')

        expect(input.type).to.equal(TodoTextInput)
        expect(input.props.newTodo).to.equal(true)
        expect(input.props.placeholder).to.equal('What needs to be done?')
    })

  it ('should call addTodo if length of text is greater than 0')
})
