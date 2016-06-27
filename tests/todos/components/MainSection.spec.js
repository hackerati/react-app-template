'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import MainSection from '../../../src/todos/components/MainSection'
import TodoItem from '../../../src/todos/components/TodoItem'

function setup () {
  const props = {
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
  }

  const component = shallow (
    <MainSection {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('MainSection component', () => {
  it ('should render correctly', () => {
    const { component, props } = setup ()
    expect(component.type()).to.equal('section')
    expect(component.hasClass('main')).to.be.true

    const ul = component.children('ul')
    expect(ul).to.have.length(1)

    const items = ul.children()
    expect(items).to.have.length(2)
    items.forEach ( (item, i) => {
      expect(item.type()).to.equal(TodoItem)
      expect(item.props().todo).to.equal(props.todos[i])
    })
  })
})
