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
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder="What needs to be done?" />
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
}

export default Header
