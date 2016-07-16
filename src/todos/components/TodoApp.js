'use strict'

import React, { Component, PropTypes } from 'react'
import Radium, { StyleRoot, Style } from 'radium'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as actions from '../actions'

@Radium
class TodoApp extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <StyleRoot>
        <Style rules={styles.root} />

        <div style={styles.todoapp} >
          <Header todos={todos} actions={actions} />
          <MainSection todos={todos} actions={actions} />
        </div>
      </StyleRoot>
    )
  }
}

TodoApp.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const styles = {
  root: {
    body: {
      fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 300,
      lineHeight: '1.4em',
      background: '#f5f5f5',
      color: '#4d4d4d',
      minWidth: 230,
      maxWidth: 550,
      margin: '0 auto',
      padding: 0,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    html: {
      margin: 0,
      padding: 0,
    },
    button: {
      margin: 0,
      padding: 0,
      border: 0,
      background: 'none',
      fontSize: '100%',
      verticalAlign: 'baseline',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
      WebkitAppearance: 'none',
      appearance: 'none',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    ':focus': {
      outline: 0
    },
    '.hidden': {
      display: 'none'
    },
    '::-webkit-input-placeholder': {
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#e6e6e6',
    },
    ':-moz-placeholder': {
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#e6e6e6',
    },
   '::-moz-placeholder': {
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#e6e6e6',
    },
    ':-ms-input-placeholder': {
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#e6e6e6',
    },
    mediaQueries: {
      'screen and (-webkit-min-device-pixel-ratio:0)': {
        '.toggle-all, .todo-list li .toggle': {
          background: 'none',
        },
        '.todo-list li .toggle': {
          height: 40,
        },
        '.toggle-all': {
          WebkitTransform: 'rotate(90deg)',
          transform: 'rotate(90deg)',
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      },
      '(max-width: 430px)': {
        '.footer': {
          height: 50,
        },
        '.filters': {
          bottom: 10,
        },
      },
    },
  },
  todoapp: {
    background: '#fff',
    margin: '130px 0 40px 0',
    position: 'relative',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
