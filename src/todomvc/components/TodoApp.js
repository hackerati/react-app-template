'use strict';

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as actions from '../actions'

class TodoApp extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const {todos, actions} = this.props;

    return (
      <div>
        <Header actions={actions}/>
        <MainSection todos={todos} actions={actions}/>
      </div>
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
