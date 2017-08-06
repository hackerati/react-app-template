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

  setVisibility(event) {
    this.setState({
      show_all: event.target.value === 'show_all',
      show_completed: event.target.value === 'show_completed',
      show_not_completed: event.target.value === 'show_not_completed'
    });
  }

  showTodo(status) {
    if (this.state.show_completed && status) return true;
    else if (this.state.show_not_completed && !status) return true;
    else return this.state.show_all;
  }

  render() {
    const {todos, actions} = this.props;

    return (
      <section>
        <ul>
          {todos.map(todo => this.showTodo.bind(this)(todo.get('completed')) &&
            <TodoItem key={todo.get('id')} todo={todo} {...actions} />)}
        </ul>
        <Footer todos={todos} deleteCompletedTodos={actions.deleteCompletedTodos}/>
        <input id="id_show_all"
               type="radio"
               value="show_all"
               name="complete_status"
               checked={this.state.show_all}
               onChange={this.setVisibility.bind(this)}/> show all
        <input id="id_show_completed"
               type="radio"
               value="show_completed"
               name="complete_status"
               checked={this.state.show_completed}
               onChange={this.setVisibility.bind(this)}/> show completed
        <input id="id_show_not_completed"
               type="radio"
               value="show_not_completed"
               name="complete_status"
               checked={this.state.show_not_completed}
               onChange={this.setVisibility.bind(this)}/> show not completed
      </section>
    )
  }
}
