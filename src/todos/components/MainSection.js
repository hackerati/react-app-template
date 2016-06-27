'use strict'

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import TodoItem from './TodoItem'

class MainSection extends Component {
  constructor (props, context) {
    super (props, context)
  }

  render () {
    const { todos } = this.props

    return (
      <section className="main">
        <ul className="todo-list">
          { _.map (todos, todo => 
              <TodoItem key={todo.id} todo={todo} />
          )}
        </ul>
      </section>
    )
  }
}

export default MainSection
