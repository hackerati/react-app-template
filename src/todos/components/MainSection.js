'use strict'

import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

class MainSection extends Component {
  constructor (props, context) {
    super (props, context)
  }

  renderToggleAll (completedCount) {
    const { todos, actions } = this.props
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter (completedCount) {
    const { todos } = this.props
    const activeCount = todos.size - completedCount

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount} />
      )
    }
  }

  render () {
    const { todos, actions } = this.props

    const completedCount = todos.filter ( todo => todo.get('completed') ).size

    return (
      <section className="main">
        { this.renderToggleAll (completedCount) }
        <ul className="todo-list">
          { todos.map ( todo =>
              <TodoItem key={todo.get('id')} todo={todo} {...actions} />
          )}
        </ul>
        { this.renderFooter (completedCount) }
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
