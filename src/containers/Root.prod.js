import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Counter from './Counter';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    );
  }
}
