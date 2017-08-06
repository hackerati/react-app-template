'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Footer from '../../../src/todomvc/components/Footer'

function setup() {
  const component = shallow(
    <Footer/>
  );

  return {
    component: component
  }
}

describe('Footer component', () => {
  describe('Should render correctly', () => {
    it('Should be a Footer', () => {
      const {component} = setup();

      expect(component.type()).to.equal('footer')
    })
  })
});
