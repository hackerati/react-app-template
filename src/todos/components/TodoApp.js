'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import * as actions from '../actions'

class TodoApp extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <Header addTodo={actions.add} />
      </div>
    )
  }
}

TodoApp.propTypes = {
  todos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
