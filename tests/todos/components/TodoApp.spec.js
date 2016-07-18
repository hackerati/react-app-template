'use strict'

import React from 'react'
import { List, fromJS } from 'immutable'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import configureStore from '../../../src/store/configureStore'
import TodoApp from '../../../src/todos/components/TodoApp'

function setup () {
  const store = configureStore ()
  const props = {
    store: store
  }

  const component = shallow (
    <TodoApp {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('TodoApp component', () => {
  it ('should render correctly', () => {
    const { component } = setup ()
    expect(component.find('TodoApp')).to.have.length(1)
    expect(component.find('TodoApp').at(0).prop('todos')).to.equal(fromJS ([]))
    expect(component.find('TodoApp').at(0).prop('actions')).to.be.defined
    expect(component.find('TodoApp').shallow().find('Header')).to.have.length(1)
  })
})
