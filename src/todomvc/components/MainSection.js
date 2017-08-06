'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'
import Footer from "./Footer";

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const {todos, actions} = this.props;

    return (
      <section>
        <ul>
          {todos.map(todo => <TodoItem key={todo.get('id')} todo={todo} {...actions} />)}
        </ul>
        <Footer todos={todos}/>
      </section>
    )
  }
}
