'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import TodoTextInput from './TodoTextInput'

@Radium
export default class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  styles = {
    header: {
      height: 110
    },

    h1: {
      position: 'absolute',
      top: -140,
      width: '100%',
      fontSize: 100,
      fontWeight: 100,
      textAlign: 'center',
      color: 'rgba(175, 47, 47, 0.15)',
      WebkitTextRendering: 'optimizeLegibility',
      MozTextRendering: 'optimizeLegibility',
      textRendering: 'optimizeLegibility',
    },

    toggleAll: {
      position: 'relative',
      top: 10,
      width: 14,
      height: 14,
      margin: '8 8 8 20',
      verticalAlign: 'middle',
      cursor: 'pointer'
    }
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
      <header style={this.styles.header}>
        <h1 style={this.styles.h1}>todos</h1>
        <TodoTextInput placeholder="What needs to be done?" isNew onSave={this.handleSave.bind(this)}/>
        <input type="checkbox"
               name="all_completed"
               checked={this.state.all_completed}
               style={this.styles.toggleAll}
               onChange={ this.handleToggleCompletedAll.bind(this) }/>toggle &quot;completed&quot; status for all todos (checked = completed)
      </header>
    )
  }
}
