'use strict'

import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import * as todoFilters from '../TodoFilters'

class Footer extends Component {
  renderTodoCount () {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilters () {
    const { filter: selectedFilter, onShow } = this.props
    const filters = [
      { type: todoFilters.SHOW_ALL, label: 'All' },
      { type: todoFilters.SHOW_ACTIVE, label: 'Active' },
      { type: todoFilters.SHOW_COMPLETED, label: 'Completed' },
    ]

    return (
      <ul className="filters">
        { filters.map ( filter =>
          <li key={filter.type}>
            <a className={classnames ({ selected: filter.type === selectedFilter })}
               style={{ cursor: 'pointer' }}
               onClick={() => onShow(filter.type)}>
              { filter.label }
            </a>
          </li>
        )}
      </ul>
    ) 
  }

  render () {
    const { todos, actions } = this.props

    return (
      <footer className="footer">
        { this.renderTodoCount () }
        { this.renderFilters () }
      </footer>
    )
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
}

export default Footer
