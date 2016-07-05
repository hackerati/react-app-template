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
  describe ('Display', () => {
    it ('should be a MainSection component', () => {
      const { component } = setup ()
      expect(component.type()).to.equal(MainSection)
    })

    it ('should include a checkbox to toggle task completion', () => {
      const { component } = setup ()
      const input = component.children('input')
      expect(input.prop('type')).to.equal('checkbox')
      expect(input.prop('checked')).to.be.false
    })

    it ('should be checked when all todos are completed', () => {
      const completed = {
        todos: List ([
          Map ({ id: uuid.v4(), description: 'Use Redux', completed: true, }),
        ]),
      }
      const { component } = setup (completed)
      const input = component.children('input')
      expect(input.prop('checked')).to.be.true
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

    it ('should include a Footer component with buttons to filter the task list')
  })

  describe ('Behavior', () => {
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

    it ('should call delete() when the delete button is clicked', () => {
      const { component, props } = setup ()
      const item = component.children('ul').children(0) // get the first item
      item.find('button').at(0).simulate ('click') // click its button 
      expect(props.actions.del.called).to.be.true
    })

    it ('should call complete() when the complete checkbox is clicked', () => {
      const { component, props } = setup ()
      const item = component.children('ul').children(0) // get the first item
      item.find('input').at(0).simulate ('change') // change its input checkbox 
      expect(props.actions.complete.called).to.be.true
    })

    it ('should call completeAll() when the toggle checkbox is changed', () => {
      const { component, props } = setup ()
      component.children('input').simulate ('change') 
      expect(props.actions.completeAll.called).to.be.true
    })
  })
})
