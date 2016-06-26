'use strict'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { todo, completeTodo } = this.props

    return (
      <li className={ classnames ({ completed: todo.completed })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={ todo.completed }
                 onChange={ () => completeTodo (todo.id) }  />
          <label>
            { todo.text }
          </label>
          <button className="destroy" />
        </div>
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoItem
