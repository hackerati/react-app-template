'use strict';

import React from 'react'
import {expect} from 'chai'
import sinon from 'sinon'
import {shallow} from 'enzyme'
import Counter from '../../src/counter/components/Counter'

function setup(value = 0) {
  const actions = {
    increment: sinon.spy(),
    decrement: sinon.spy(),
  };

  const component = shallow(
    <Counter value={value} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    p: component.find('p')
  }
}

describe('Counter component', () => {
  it('should display count', () => {
    const {p} = setup();
    expect(p.text()).to.match(/^Clicked: 0 times/)
  });

  it('first button should call increment', () => {
    const {buttons, actions} = setup();
    buttons.at(0).simulate('click');
    expect(actions.increment.called).to.be.true
  });

  it('second button should call decrement', () => {
    const {buttons, actions} = setup();
    buttons.at(1).simulate('click');
    expect(actions.decrement.called).to.be.true
  });

  it('third button should not call increment if the counter is even', () => {
    const {p, buttons, actions} = setup(42);
    buttons.at(2).simulate('click');
    expect(actions.increment.called).to.be.false
  });

  it('third button should call increment if the counter is odd', () => {
    const {buttons, actions} = setup(43);
    buttons.at(2).simulate('click');
    expect(actions.increment.called).to.be.true
  });

  it('third button should call increment if the counter is odd and negative', () => {
    const {buttons, actions} = setup(-43);
    buttons.at(2).simulate('click');
    expect(actions.increment.called).to.be.true
  });

  it('fourth button should call increment in a second', (done) => {
    const {buttons, actions} = setup();
    buttons.at(3).simulate('click');
    setTimeout(() => {
      expect(actions.increment.called).to.be.true;
      done()
    }, 1000)
  })
});
