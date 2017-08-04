'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired
  };

  render() {
    const props = this.props;

    return (
      <section>
        <ul>
          {props.todos.map(todo => <TodoItem key={todo.get('id')} todo={todo}/>)}
        </ul>
      </section>
    )
  }
}
