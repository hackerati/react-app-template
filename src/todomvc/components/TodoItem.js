'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleCompleteOneTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({editing: true})
  }

  handleSave(id, text) {
    text === '' ? this.props.deleteTodo(id) : this.props.editTodo(id, text);
    this.setState({editing: false})
  }

  renderTodoListItem() {
    const {todo, deleteTodo, toggleCompleteOneTodo} = this.props;

    return (
      <li>
        <label onDoubleClick={this.handleDoubleClick.bind(this)}>
          {todo.get('description')}
        </label>
        <input type="checkbox" name="completed" checked={todo.get('completed')}
               onChange={ () => toggleCompleteOneTodo(todo.get('id')) }/>completed
        <button className="destroy" onClick={() => deleteTodo(todo.get('id'))}>delete todo</button>
      </li>
    )
  }

  renderTodoTextInput() {
    const {todo, deleteTodo, toggleCompleteOneTodo} = this.props;

    return (
      <li>
        <TodoTextInput text={todo.get('description')} onSave={(text) => this.handleSave(todo.get('id'), text)}/>
        <input type="checkbox" name="completed" checked={todo.get('completed')}
               onChange={ () => toggleCompleteOneTodo(todo.get('id')) }/>completed
        <button className="destroy" onClick={() => deleteTodo(todo.get('id'))}>delete todo</button>
      </li>
    )
  }

  render() {
    return ( this.state.editing ? this.renderTodoTextInput() : this.renderTodoListItem() )
  }
}
