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

  renderToggleAll (completedCount) {
    const { todos, actions } = this.props
    if (todos.size > 0) {
      return (
        <div style={styles.toggleAll}>
          <div style={(completedCount === todos.size ? styles.toggleAllChecked : styles.toggleAllUnchecked)}
               onClick={actions.completeAll}>
            ❯
          </div>
        </div>
      )
    }
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
        { this.renderToggleAll (completedCount) }
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
  toggleAll: {
    position: 'absolute',
    top: -55,
    left: -5,
    width: 60,
    height: 34,
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  toggleAllUnchecked: {
    fontSize: 22,
    color: '#e6e6e6',
    padding: '10px 27px 10px 27px',
    transform: 'rotate(90deg)',
  },
  toggleAllChecked: {
    fontSize: 22,
    color: '#737373',
    padding: '10px 27px 10px 27px',
    transform: 'rotate(90deg)',
  },
}

export default MainSection
