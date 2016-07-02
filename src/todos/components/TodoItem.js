'use strict'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave (id, text) {
    if (text.length === 0) {
      this.props.del (id)
    } else {
      this.props.edit (id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, complete, del } = this.props

    if (this.state.editing) {
      return (
        <li className = { classnames ({ completed: todo.get('completed'),
                                      editing: this.state.editing })}>
          <TodoTextInput text = { todo.get('description') } editing = { this.state.editing }
                         onSave={ (text) => this.handleSave (todo.get('id'), text) } />
        </li>
      )
    } else {
      return (
        <li className={ classnames ({ completed: todo.get('completed'),
                                      editing: this.state.editing })}>
          <div className="view">
            <input className="toggle" type="checkbox" checked={ todo.get('completed') }
                   onChange={ () => complete (todo.get('id')) }  />
            <label onDoubleClick= { this.handleDoubleClick.bind (this) }>
              { todo.get('description') }
            </label>
            <button className="destroy" onClick={ () => del (todo.get('id')) } />
          </div>
        </li>
      )
    }
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  complete: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
}

export default TodoItem
