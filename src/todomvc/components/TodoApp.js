'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Radium, {StyleRoot, Style} from 'radium'

import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as actions from '../actions'

@Radium
class TodoApp extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  styles = {
    root: {
      html: {
        margin: 0,
        padding: 0
      },

      body: {
        fontFamily: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
        fontSize: '14px',
        fontWeight: 300,
        lineHeight: '1.4em',
        background: '#f5f5f5',
        color: '#4d4d4d',
        minWidth: 230,
        maxWidth: 666,
        margin: '0 auto',
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      },

      ':focus': {
        outline: 0
      },

      '::-webkit-input-placeholder': {

        fontStyle: 'italic',
        fontWeight: '300',
        color: '#e6e6e6'
      },

      ':-moz-placeholder': {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#e6e6e6'
      },

      '::-moz-placeholder': {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#e6e6e6'
      },

      ':-ms-input-placeholder': {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#e6e6e6'
      },

      mediaQueries: {
        'screen and (-webkit-min-device-pixel-ratio:0)': {
          'li .toggle': {
            background: 'none',
            height: 40
          }
        },

        '(max-width: 430px)': {
          '.footer': {
            height: 50,
          }
        }
      }
    },

    todoApp: {
      background: '#fff',
      margin: '130px 0 40px 0',
      position: 'relative',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
    }
  };

  render() {
    const {todos, actions} = this.props;

    return (
      <StyleRoot>
        <Style rules={this.styles.root}/>
        <div style={this.styles.todoApp}>
          <Header actions={actions}/>
          <MainSection todos={todos} actions={actions}/>
        </div>
      </StyleRoot>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
