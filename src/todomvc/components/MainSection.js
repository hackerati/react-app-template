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

  constructor(props, context) {
    super(props, context);
    this.state = {
      show_all: true,
      show_completed: false,
      show_not_completed: false
    }
  }

  render() {
    const {todos, actions} = this.props;

    return (
      <section>
        <ul>
          {todos.map(todo => <TodoItem key={todo.get('id')} todo={todo} {...actions} />)}
        </ul>
        <Footer todos={todos}/>
        <input type="radio"
               value="show_all"
               name="complete_status"
               checked={this.state.show_all}/> show all
        <input type="radio"
               value="show_completed"
               name="complete_status"
               checked={this.state.show_completed}/> show completed
        <input type="radio"
               value="show_not_completed"
               name="complete_status"
               checked={this.state.show_not_completed}/> show not completed
      </section>
    )
  }
}
