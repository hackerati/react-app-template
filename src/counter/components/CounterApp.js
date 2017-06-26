'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Counter from './Counter'
import * as CounterActions from '../actions'

class CounterApp extends Component {
  render() {
    const {counter, dispatch} = this.props;
    return (
      <Counter value={counter} {...bindActionCreators(CounterActions, dispatch)} />
    )
  }
}

CounterApp.propTypes = {
  counter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    counter: state.counter.get('value')
  }
}

export default connect(select)(CounterApp)
