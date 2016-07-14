'use strict'

import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import TodoTextInput from './TodoTextInput'

@Radium
class Header extends Component {
  handleSave (text) {
    if (text.length !== 0) {
      this.props.addTodo (text)
    }
  }

  render() {
    return (
      <header>
        <h1 style={styles.h1} >todos</h1>
        <TodoTextInput placeholder="What needs to be done?"
                       onSave={this.handleSave.bind(this)}
                       isNew
                       style={styles.todoTextInputNew} />
      </header>
    )
  }
}
 
Header.propTypes = {
  addTodo: PropTypes.func.isRequired
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
  },
}

export default Header
