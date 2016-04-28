import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

render(
  <AppContainer
    component={Root}
  />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(
      <AppContainer
        component={require('./Root').default}
      />,
      document.getElementById('root')
    );
  });
}
