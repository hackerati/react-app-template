'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import TodoTextInput from '../../../src/todomvc/components/TodoTextInput'

function setup() {
  const props = {
    text: 'my todo',
    placeholder: 'do it',
  };
  const component = shallow(
    <TodoTextInput {...props} />
  );

  return {
    props: props,
    component: component
  }
}

describe('TodoTextInput component', () => {
  describe('Should render correctly', () => {
    it('Should be a TodoTextInput component', () => {
      const {props, component} = setup();

      expect(component.find('input')).to.have.length(1);
      expect(component.find('input').at(0).prop('placeholder')).to.equal(props.placeholder);
      expect(component.find('input').at(0).prop('value')).to.equal(props.text)
    })
  })
});
