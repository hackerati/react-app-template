'use strict';

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Header from '../components/Header'
import * as actions from '../actions'

class TodoApp extends Component {
  render() {
    const props = this.props;

    return (
      <Header actions={props.actions}/>
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
