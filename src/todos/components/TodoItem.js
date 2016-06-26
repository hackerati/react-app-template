'use strict'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { todo } = this.props

    return (
      <li className={ classnames ({ completed: todo.completed })}>
        <div className="view">
          <input className="toggle" type="checkbox" />
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
}

export default TodoItem
