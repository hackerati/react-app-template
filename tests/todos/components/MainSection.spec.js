'use strict'

import React from 'react'
import { List, Map } from 'immutable'
import uuid from 'uuid'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import MainSection from '../../../src/todos/components/MainSection'
import TodoItem from '../../../src/todos/components/TodoItem'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'

function setup () {
  const props = {
    todos: List ([
      Map ({ id: uuid.v4(), description: 'Use Redux', completed: false, }),
      Map ({ id: uuid.v4(), description: 'Run the tests', completed: false, })
    ]),
    actions: {
      edit: sinon.spy (),
      del: sinon.spy (),
      complete: sinon.spy (),
    }
  }

  const component = mount (
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

    expect(component.type()).to.equal(MainSection)

    const ul = component.children('ul')
    expect(ul).to.have.length(1)

    const items = ul.children()
    expect(items).to.have.length(props.todos.size)
    items.forEach ( (item, i) => {
      expect(item.type()).to.equal(TodoItem)
      expect(item.props().todo).to.equal(props.todos.get(i))
    })
  })

  it ('should call edit() when saving a string in edit mode', () => {
    const { component, props } = setup ()
    component.find('label').at(0).simulate ('doubleclick') // switch first item to edit mode
    component.find(TodoTextInput).props().onSave('Use Redux')
    expect(props.actions.edit.called).to.be.true
  })

  it ('should call delete() when saving an empty string in edit mode', () => {
    const { component, props } = setup ()
    component.find('label').at(0).simulate ('doubleclick') // switch first item to edit mode
    component.find(TodoTextInput).props().onSave('')
    expect(props.actions.del.called).to.be.true
  })

  it ('should call delete() when the delete button is clicked', () => {
    const { component, props } = setup ()
    component.find('button').at(0).simulate ('click') // click the button on the first item
    expect(props.actions.del.called).to.be.true
  })

  it ('should call complete() when the complete checkbox is clicked', () => {
    const { component, props } = setup ()
    component.find('input').at(0).simulate ('change') // change the input checkbox on the first item
    expect(props.actions.complete.called).to.be.true
  })
})
