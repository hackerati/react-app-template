'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired
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
      this.props.onSave(text)
    }
  }

  render() {
    return (
      <input type="text" placeholder={this.props.placeholder} value={this.state.text}
             onChange={this.handleChange.bind(this)} onKeyDown={this.handleSubmit.bind(this)}/>
    )
  }
}
