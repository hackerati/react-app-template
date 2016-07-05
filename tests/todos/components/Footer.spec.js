'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Footer from '../../../src/todos/components/Footer'

function setup (propOverrides) {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
  }, propOverrides)

  const component = shallow (
    <Footer {...props} />
  )

  return {
    props: props,
    component: component,
  }
}

describe ('Footer component', () => {
  it ('should render correctly', () => {
    const { component } = setup ()
    expect(component.type()).to.equal('footer')

    const span = component.children('span')
    expect(span.prop('className')).to.equal('todo-count')
  })

  it ('should display \'No items left\' when active count is 0', () => {
    const { component } = setup ({ activeCount: 0 })
    const span = component.children('span')
    expect(span.text()).to.equal('No items left')
  })

  it ('should display \'1 item left\' when active count is 1', () => {
    const { component } = setup ({ activeCount: 1 })
    const span = component.children('span')
    expect(span.text()).to.equal('1 item left')
  })
})
