'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Header from '../../../src/todomvc/components/Header'

function setup() {
  const component = shallow(
    <Header/>
  );

  return {
    component: component
  }
}

describe('Header component', () => {
  describe('Should render correctly', () => {
    it('Should be a Header', () => {
      const {component} = setup();

      expect(component.type()).to.equal('header')
    })
  })
});
