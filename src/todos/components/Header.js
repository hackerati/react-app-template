'use strict'

import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import TodoTextInput from './TodoTextInput'

@Radium
class Header extends Component {
  handleSave (text) {
    if (text.length !== 0) {
      this.props.actions.add (text)
    }
  }

  handleCompleteAll () {
    this.props.actions.completeAll ()
  }

  renderToggleAll () {
    const { todos } = this.props

    const completedCount = todos.filter ( todo => todo.get('completed') ).size

    if (todos.size > 0) {
      return (
        <div onClick={this.handleCompleteAll.bind(this)}
             style={[ styles.toggleAll, 
                      completedCount === todos.size && styles.toggleAllChecked ]}>
          ❯
        </div>
      )
    }
  }

  render() {
    return (
      <header>
        <h1 style={styles.h1} >todos</h1>
        { this.renderToggleAll () }
        <TodoTextInput placeholder="What needs to be done?"
                       onSave={this.handleSave.bind(this)}
                       isNew
                       style={styles.todoTextInputNew} />
      </header>
    )
  }
}
 
Header.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const styles = {
  h1: {
    position: 'absolute',
    top: '-155px',
    width: '100%',
    fontSize: '100px',
    fontWeight: '100',
    textAlign: 'center',
    color: 'rgba(175, 47, 47, 0.15)',
    WebkitTextRendering: 'optimizeLegibility',
    MozTextRendering: 'optimizeLegibility',
    textRendering: 'optimizeLegibility',
  },

  toggleAll: {
    position: 'absolute',
    top: 16,
    left: -12,
    width: 60,
    height: 34,
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
    fontSize: 22,
    color: '#e6e6e6',
    transform: 'rotate(90deg)',
  },

  toggleAllChecked: {
    color: '#737373',
  },

  todoTextInputNew: {
    position: 'relative',
    margin: 0,
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 24,
    color: 'inherit',
    lineHeight: '1.4em',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    padding: '16px 16px 16px 60px',
    border: 'none',
    background: 'rgba(0, 0, 0, 0.003)',
    boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
    ':focus': {
      outline: 0
    },
    '.hidden': {
      display: 'none'
    },
  },
}

export default Header
