'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    }
  }

  render() {
    return (
      <input type="text" placeholder={this.props.placeholder} value={this.state.text}/>
    )
  }
}
