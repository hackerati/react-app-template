'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../counter/components/Counter'
import * as CounterActions from '../counter/actions'

class CounterApp extends Component {
  render () {
    const { counter, dispatch } = this.props
    return (
      <Counter value={counter} {...bindActionCreators (CounterActions, dispatch)} />
    )
  }
}

function select (state) {
  return {
    counter: state.counter.get ('value')
  }
}

export default connect (select) (CounterApp)
