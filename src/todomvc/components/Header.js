'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text)
    }
  }

  render() {
    return (
      <header>
        <h1>todos</h1>
        <TodoTextInput placeholder="What needs to be done?" isNew onSave={this.handleSave.bind(this)}/>
        <input type="checkbox" name="all_completed" />toggle &quot;completed&quot; status for all Todos (checked = completed)
      </header>
    )
  }
}
