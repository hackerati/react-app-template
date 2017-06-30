'use strict';

import React, {Component} from 'react'
import {Provider} from 'react-redux'

import {CounterApp} from '../counter'
import PropTypes from '../PropTypes'
import DevTools from './DevTools'

class Root extends Component {
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <CounterApp />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.store.isRequired
};

export default Root;
