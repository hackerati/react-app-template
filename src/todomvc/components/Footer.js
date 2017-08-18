'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Footer extends Component {
  static propTypes = {
    todos: PropTypes.object
  };

  static countNotCompleted(todos) {
    if (typeof todos === "undefined") return '';
    else if (todos.filter(todo => todo.get('completed') !== true).count() === 0) return 'No todos left'
  }

  render() {
    const {todos} = this.props;

    return (
      <footer>
        <label>The number of todos not completed: {Footer.countNotCompleted(todos)}</label>
      </footer>
    )
  }
}
