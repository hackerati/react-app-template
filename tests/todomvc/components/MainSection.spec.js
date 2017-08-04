'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import MainSection from '../../../src/todomvc/components/MainSection'

function setup() {
  const component = shallow(
    <MainSection/>
  );

  return {
    component: component
  }
}

describe('MainSection component', () => {
  describe('Should render correctly', () => {
    it('Should be a MainSection component', () => {
      const {component} = setup();

      expect(component.type()).to.equal('section')
    })
  })
});
