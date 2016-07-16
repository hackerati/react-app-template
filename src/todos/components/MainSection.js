'use strict'

import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import TodoItem from './TodoItem'
import Footer from './Footer'
import * as todoFilters from '../TodoFilters'

@Radium
class MainSection extends Component {
  constructor (props, context) {
    super (props, context)
    this.state = { filter: todoFilters.SHOW_ALL }
  }

  handleShow (filter) {
    this.setState ({ filter: filter })
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  renderFooter (completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.size - completedCount

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onShow={this.handleShow.bind(this)}
                onClearCompleted={this.handleClearCompleted.bind(this)} />
      )
    }
  }

  render () {
    const { todos, actions } = this.props
    const { filter } = this.state
    const TODO_FILTERS = {
      [todoFilters.SHOW_ALL]: () => true,
      [todoFilters.SHOW_ACTIVE]: todo => !todo.get('completed'),
      [todoFilters.SHOW_COMPLETED]: todo => todo.get('completed'),
    }

    const filteredTodos = todos.filter (TODO_FILTERS[filter])
    const completedCount = todos.filter ( todo => todo.get('completed') ).size

    return (
      <section style={styles.mainSection}>
        <ul style={styles.todoList}>
          { filteredTodos.map ( todo =>
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

const styles = {
  mainSection: {
    position: 'relative',
    zIndex: 2,
    borderTop: '1px solid #e6e6e6',
  },

  todoList: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
}

export default MainSection
