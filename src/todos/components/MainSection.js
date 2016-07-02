'use strict'

import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'

class MainSection extends Component {
  constructor (props, context) {
    super (props, context)
  }

  render () {
    const { todos, actions } = this.props

    return (
      <section className="main">
        <ul className="todo-list">
          { todos.map ( todo =>
              <TodoItem key={todo.get('id')} todo={todo} {...actions} />
          )}
        </ul>
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
