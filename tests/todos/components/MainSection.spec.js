'use strict'

import React from 'react'
import { List, Map } from 'immutable'
import uuid from 'uuid'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import MainSection from '../../../src/todos/components/MainSection'
import TodoItem from '../../../src/todos/components/TodoItem'
import TodoTextInput from '../../../src/todos/components/TodoTextInput'
import Footer from '../../../src/todos/components/Footer'

function setup (propOverrides) {
  const props = Object.assign({
    todos: List ([
      Map ({ id: uuid.v4(), description: 'Use Redux', completed: false, }),
      Map ({ id: uuid.v4(), description: 'Run the tests', completed: false, })
    ]),
    actions: {
      edit: sinon.spy (),
      del: sinon.spy (),
      complete: sinon.spy (),
      completeAll: sinon.spy (),
      clearCompleted: sinon.spy (),
    }
  }, propOverrides)

  const component = mount (
    <MainSection {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('MainSection component', () => {
  describe ('Should render correctly', () => {
    it ('should be a MainSection component', () => {
      const { component } = setup ()
      expect(component.type()).to.equal(MainSection)
    })

    it ('should include a list of tasks', () => {
      const { component, props } = setup ()
      const ul = component.children('ul')
      expect(ul).to.have.length(1)
      const items = ul.children()
      expect(items).to.have.length(props.todos.size)
      items.forEach ( (item, i) => {
        expect(item.type()).to.equal(TodoItem)
        expect(item.props().todo).to.equal(props.todos.get(i))
      })
    })

    it ('should include a Footer component', () => {
      const { component } = setup ()
      const footer = component.children(Footer)
      expect(footer.type()).to.equal(Footer)
    })
  })

  describe ('Should behave correctly', () => {
    it ('should call edit() when saving a string in edit mode', () => {
      const { component, props } = setup ()
      const item = component.children('ul').children(0) // get the first item
      item.find('label').at(0).simulate ('doubleclick') // switch it to edit mode
      item.find(TodoTextInput).props().onSave('Use Redux Edited')
      expect(props.actions.edit.called).to.be.true
    })

    it ('should call delete() when saving an empty string in edit mode', () => {
      const { component, props } = setup ()
      const item = component.children('ul').children(0) // get the first item
      item.find('label').at(0).simulate ('doubleclick') // switch it to edit mode
      item.find(TodoTextInput).props().onSave('')
      expect(props.actions.del.called).to.be.true
    })

    it ('should call delete() when the delete button is clicked')
    // how to trigger TodoItem li hover state to show the delete button?

    it ('should call complete() when the complete button is clicked', () => {
      const { component, props } = setup ()
      const item = component.children('ul').children(0) // get the first item
      item.find('svg').at(0).simulate ('click') // change its input checkbox 
      expect(props.actions.complete.called).to.be.true
    })

    it ('should call clearCompleted() when the clear completed button is clicked', () => {
      const completed = {
        todos: List ([
          Map ({ id: uuid.v4(), description: 'Use Redux', completed: true, }),
        ]),
      }
      const { component, props } = setup (completed)
      const footer = component.children(Footer)
      footer.find('button').simulate ('click')
      expect(props.actions.clearCompleted.called).to.be.true
    })
  })
})
