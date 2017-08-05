'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired
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
    this.props.editTodo(id, text);
    this.setState({editing: false})
  }

  renderTodoListItem() {
    const {todo} = this.props;

    return (
      <li>
        <label onDoubleClick={this.handleDoubleClick.bind(this)}>
          {todo.get('description')}
        </label>
      </li>
    )
  }

  renderTodoTextInput() {
    const {todo} = this.props;

    return (
      <li>
        <TodoTextInput text={todo.get('description')} onSave={(text) => this.handleSave(todo.get('id'), text)}/>
      </li>
    )
  }

  render() {
    return ( this.state.editing ? this.renderTodoTextInput() : this.renderTodoListItem() )
  }
}
