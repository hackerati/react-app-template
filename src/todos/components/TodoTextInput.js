'use strict'

import React, { Component, PropTypes } from 'react'

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  render() {
    return (
      <input className=""
        type="text"
        placeholder={this.props.placeholder}
        value={this.state.text}
        />
    )
  }
}

TodoTextInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
}

export default TodoTextInput
