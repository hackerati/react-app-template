'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import counter from '../counter'
const { CounterApp } = counter.components.default

export default class Root extends Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    )
  }
}
