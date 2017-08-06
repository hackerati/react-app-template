'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      all_completed: false
    }
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text)
    }
  }

  handleToggleCompletedAll() {
    const reversed_completed_status = !this.state.all_completed;

    this.setState({all_completed: reversed_completed_status});
    this.props.actions.toggleCompleteAllTodos(reversed_completed_status)
  }

  render() {
    return (
      <header>
        <h1>todos</h1>
        <TodoTextInput placeholder="What needs to be done?" isNew onSave={this.handleSave.bind(this)}/>
        <input type="checkbox" name="all_completed" checked={this.state.all_completed}
               onChange={ this.handleToggleCompletedAll.bind(this) }/>toggle &quot;completed&quot; status for all todos (checked = completed)
      </header>
    )
  }
}
