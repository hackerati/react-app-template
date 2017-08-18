'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import TodoTextInput from './TodoTextInput'

@Radium
export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleCompleteOneTodo: PropTypes.func.isRequired,
    isLast: PropTypes.bool
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

  renderButtonUnchecked() {
    const {todo, toggleCompleteOneTodo} = this.props;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"
           onClick={() => toggleCompleteOneTodo(todo.get('id'))}>
        <circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" strokeWidth="3"/>
      </svg>
    )
  }

  renderButtonChecked() {
    const {todo, toggleCompleteOneTodo} = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"
           onClick={() => toggleCompleteOneTodo(todo.get('id'))}>
        <circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" strokeWidth="3"/>
        <path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/>
      </svg>
    )
  }

  renderTodoListItem() {
    const {todo, deleteTodo, isLast} = this.props;

    return (
      <li style={{position: 'relative',
                  fontSize: 20,
                  borderBottom: isLast ? 'none' : '1px solid #ededed',
                  ':hover': {}}}>
        {todo.get('completed') ? this.renderButtonChecked() : this.renderButtonUnchecked()}
        <label onDoubleClick={this.handleDoubleClick.bind(this)}>
          {todo.get('description')}
        </label>
        <div onClick={() => deleteTodo(todo.get('id'))}>x</div>
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
