'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

@Radium
export default class Footer extends Component {
  static propTypes = {
    todos: PropTypes.object,
    deleteCompletedTodos: PropTypes.func.isRequired
  };

  styles = {
    footer: {
      color: '#777',
      padding: '10px 15px',
      height: 20,
      borderTop: '1px solid #e6e6e6'
    },

    deleteCompleted: {
      position: 'relative',
      float: 'right',
      marginTop: 2,
      border: 0,
      color: 'rgba(175, 47, 47, 0.75)',
      background: 'none',
      textDecoration: 'none',
      fontSize: '100%',
      cursor: 'pointer',
      WebkitAppearance: 'none',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }
  };

  static hasCompleted(todos) {
    if (typeof todos === "undefined") return false;
    else return todos.filter(todo => todo.get('completed') === true).count() > 0;
  }

  static countNotCompleted(todos) {
    if (typeof todos === "undefined") return '';
    else if (todos.filter(todo => todo.get('completed') !== true).count() === 0) return 'No todos left';
    else if (todos.filter(todo => todo.get('completed') !== true).count() === 1) return '1 todo left';
    else return `${todos.filter(todo => todo.get('completed') !== true).count()} todos left`
  }

  render() {
    const todos = this.props.todos;
    const deleteCompletedTodos = this.props.deleteCompletedTodos;

    return (
      <footer style={this.styles.footer}>
        <label>
          The number of todos not completed: <strong>{Footer.countNotCompleted(todos)}</strong>
        </label>
        {Footer.hasCompleted(todos) &&
        <button style={this.styles.deleteCompleted} onClick={() => deleteCompletedTodos()}>delete completed</button>}
      </footer>
    )
  }
}
