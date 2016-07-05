'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Footer from '../../../src/todos/components/Footer'
import * as todoFilters from '../../../src/todos/TodoFilters'

function setup (propOverrides) {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    filter: todoFilters.SHOW_ALL,
    onShow: sinon.spy (),
    onClearCompleted: sinon.spy (),
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
  describe ('Display', () => {
    it ('should be a footer', () => {
      const { component } = setup ()
      expect(component.type()).to.equal('footer')
    })

    it ('should have a todo counter', () => {
      const { component } = setup ()
      const span = component.children('span')
      expect(span.prop('className')).to.equal('todo-count')
    })

    it ('should have a list of filters', () => {
      const { component } = setup ()
      const ul = component.children('ul')
      expect(ul.prop('className')).to.equal('filters')
      const filters = ul.children('li')
      expect(filters.at(0).text()).to.equal('All')
      expect(filters.at(1).text()).to.equal('Active')
      expect(filters.at(2).text()).to.equal('Completed')
    })
  })

  describe ('Behavior', () => {
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

    it ('should call onShow() when a filter is clicked', () => {
      const { component, props } = setup ()
      component.children('ul').children('li').at(1).children('a').simulate('click')
      expect(props.onShow.called).to.be.true
      expect(props.onShow.args[0][0]).to.equal(todoFilters.SHOW_ACTIVE)
    })

    it ('should not have a Clear Completed button when there are no completed todos', () => {
      const { component } = setup ({ completedCount: 0 })
      const button = component.children('button')
      expect(button.length).to.equal(0)
    })

    it ('should have a Clear Completed button when there are completed todos', () => {
      const { component } = setup ({ completedCount: 1 })
      const button = component.children('button')
      expect(button.prop('className')).to.equal('clear-completed')
    })

    it('should call onClearCompleted() when the clear completed button is clicked', () => {
      const { component, props } = setup ({ completedCount: 1 })
      component.children('button').simulate('click')
      expect(props.onClearCompleted.called).to.be.true
    })
  })
})
