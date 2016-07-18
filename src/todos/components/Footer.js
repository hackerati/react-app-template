'use strict'

import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import classnames from 'classnames'
import * as todoFilters from '../TodoFilters'

@Radium
class Footer extends Component {
  renderTodoCount () {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count" style={styles.todoCount} >
        <strong style={{fontWeight: 300}} >{activeCount || 'No'}</strong> {itemWord} left
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
      <ul className="filters" style={styles.filterList} >
        { filters.map ( filter =>
          <li key={filter.type} style={styles.filterListItem} >
            <a key={filter.type} onClick={() => onShow(filter.type)}
               style={[ styles.filterLink,
                        filter.type === selectedFilter && styles.filterLinkSelected ]}>
              { filter.label }
            </a>
          </li>
        )}
      </ul>
    ) 
  }

  renderClearButton () {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed"
                onClick={onClearCompleted}
                style={styles.clearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  render () {
    const { todos, actions } = this.props

    return (
      <div>
        <div style={styles.footerDecoration} />
        <footer className="footer" style={styles.footer} >
          { this.renderTodoCount () }
          { this.renderFilters () }
          { this.renderClearButton () }
        </footer>
      </div>
    )
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

const styles = {
  footer: {
    color: '#777',
    padding: '10px 15px',
    height: 20,
    textAlign: 'center',
    borderTop: '1px solid #e6e6e6',
  },

  footerDecoration: {
    content: '\'\'',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 50,
    overflow: 'hidden',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
  },

  todoCount: {
    float: 'left',
    textAlign: 'left',
  },

  filterList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    position: 'absolute',
    right: 0,
    left: 0,
  },

  filterListItem: {
    display: 'inline',
  },

  filterLink: {
    cursor: 'pointer',
    color: 'inherit',
    margin: 3,
    padding: '3px 7px',
    textDecoration: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 3,
    ':hover': {
      borderColor: 'rgba(175, 47, 47, 0.1)',
    },
  },

  filterLinkSelected: {
    borderColor: 'rgba(175, 47, 47, 0.2)',
  },

  clearCompleted: {
    float: 'right',
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
}

export default Footer
