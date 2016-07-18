'use strict'

import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

@Radium
class TodoTextInput extends Component {
  constructor (props, context) {
    super (props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  handleSubmit (e) {
    const text = e.target.value.trim ()
    if (e.which === 13) {
      this.props.onSave (text)
      if (this.props.isNew) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange (e) {
    this.setState ({ text: e.target.value })
  }

  handleBlur (e) {
    if (!this.props.isNew) {
      this.props.onSave (e.target.value)
    }
  }

  render() {
    return (
      <input type="text"
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        style={[ styles.todoTextInput, !this.props.isNew && styles.todoTextInputEditing ]} />
    )
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  isNew: PropTypes.bool,
}

const styles = {
  todoTextInput: {
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

  todoTextInputEditing: {
    margin: '0 0 0 43px',
    width: 506,
    fontWeight: 'inherit',
    border: '1px solid #999',
    boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
    padding: '12px 16px',
    display: 'block',
  },
}

export default TodoTextInput
