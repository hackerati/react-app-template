'use strict';

import React, {Component} from 'react'

export default class Footer extends Component {

  static countNotCompleted(todos) {
    if (typeof todos === "undefined") return ''
  }

  render() {
    return (
      <footer>
        <label>The number of todos not completed: {Footer.countNotCompleted()}</label>
      </footer>
    )
  }
}
