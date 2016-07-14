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
        style={this.props.style} />
    )
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  isNew: PropTypes.bool,
  style: PropTypes.object.isRequired,
}

export default TodoTextInput
