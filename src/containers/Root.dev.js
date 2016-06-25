'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { TodoApp } from '../todos'
import DevTools from './DevTools'

export default class Root extends Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <TodoApp />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
