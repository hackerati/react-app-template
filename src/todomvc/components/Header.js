'use strict';

import React, {Component} from 'react'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>todos</h1>
        <TodoTextInput placeholder="What needs to be done?" isNew />
      </header>
    )
  }
}
