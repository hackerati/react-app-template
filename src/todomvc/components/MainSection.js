'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import TodoItem from './TodoItem'
import Footer from "./Footer";

@Radium
export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  styles = {
    mainSectionDecoration: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: 50,
      overflow: 'hidden',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
    },

    mainSection: {
      borderTop: '1px solid #e6e6e6',
      width: '98%',
      margin: '0 auto',
      paddingBottom: 10
    },

    todoList: {
      margin: '0 0 10 0',
      padding: 0,
      listStyle: 'none'
    }
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
      <div>
        <div style={this.styles.mainSectionDecoration}/>
        <section style={this.styles.mainSection}>
          <ul style={this.styles.todoList}>
            {todos.map(todo => this.showTodo.bind(this)(todo.get('completed')) &&
              <TodoItem key={todo.get('id')} todo={todo} {...actions} />)}
          </ul>
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
        <Footer todos={todos} deleteCompletedTodos={actions.deleteCompletedTodos}/>
      </div>
    )
  }
}
