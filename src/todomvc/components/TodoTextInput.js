'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    isNew: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    }
  }

  handleChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.isNew) {
        this.setState({text: ''})
      }
    }
  }

  handleBlur(e) {
    if (!this.props.isNew) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input type="text" placeholder={this.props.placeholder} value={this.state.text}
             onChange={this.handleChange.bind(this)} onKeyDown={this.handleSubmit.bind(this)}
             onBlur={this.handleBlur.bind(this)}/>
    )
  }
}
