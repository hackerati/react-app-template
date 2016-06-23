'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Header from '../../../src/todos/components/Header'

function setup () {
  const props = {
    addTodo: sinon.spy (),
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
    it ('should render correctly')

    it ('should call addTodo if length of text is greater than 0')
})
