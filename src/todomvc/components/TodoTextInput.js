'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

@Radium
export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    isNew: PropTypes.bool
  };

  styles = {
    newTodo: {
      border: 'none',
      boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
      color: 'inherit',
      display: 'block',
      fontSize: 24,
      lineHeight: '1.4em',
      padding: '16px 16px 16px 60px',
      width: '100%',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }
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
             onBlur={this.handleBlur.bind(this)} style={this.props.isNew && this.styles.newTodo}/>
    )
  }
}
