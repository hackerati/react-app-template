'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  render() {
    const {todo} = this.props;

    return (
      <li>
        <label>
          { todo.get('description') }
        </label>
      </li>
    )
  }
}
