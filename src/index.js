'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import Reactotron from 'reactotron'

if (process.env.NODE_ENV === 'development') {
  Reactotron.connect() // connect with defaults
}

const store = configureStore ()
const rootElement = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
         <NextRoot store={store} />
      </AppContainer>,
      rootElement
    );
  });
}
