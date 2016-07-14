'use strict'

import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import TodoTextInput from './TodoTextInput'

@Radium
class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleHover () {
    console.log ('hover')
  }

  handleDoubleClick () {
    this.setState ({ editing: true })
  }

  handleSave (id, text) {
    if (text.length === 0) {
      this.props.del (id)
    } else {
      this.props.edit (id, text)
    }
    this.setState ({ editing: false })
  }

  renderButtonUnchecked () {
    const { todo, complete } = this.props
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"
           onClick={ () => complete (todo.get('id')) } style={styles.toggle} >
        <circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" strokeWidth="3"/>
      </svg>
    )
  }

  renderButtonChecked () {
    const { todo, complete } = this.props
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"
           onClick={ () => complete (todo.get('id')) } style={styles.toggle} >
        <circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" strokeWidth="3"/>
        <path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/>
      </svg>
    )
  }

  renderTodoListItem () {
    const { todo, del } = this.props
    return (
      <li key={todo.get('id')} style={styles.todoListItem} >
         { todo.get ('completed') ? this.renderButtonChecked () : this.renderButtonUnchecked () }
        <label onDoubleClick={ this.handleDoubleClick.bind (this) }
               style={todo.get('completed') ? styles.todoLabelCompleted : styles.todoLabel} >
          { todo.get('description') }
        </label>
        { Radium.getState(this.state, todo.get('id'), ':hover') ? (
          <div onClick={ () => del (todo.get('id')) } style={styles.deleteButton}>x</div>
        ) : null }
      </li>
    )
  }

  renderTodoTextInput () {
    const { todo } = this.props
    return (
      <li style={styles.todoListItemEditing} >
        <TodoTextInput text={ todo.get('description') } editing={ this.state.editing }
                       onSave={ (text) => this.handleSave (todo.get('id'), text) }
                       style={styles.todoTextInputEditing} />
      </li>
    )
  }

  render() {
    const { todo } = this.props
    return ( this.state.editing ? this.renderTodoTextInput () : this.renderTodoListItem () )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  complete: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
}

const styles = {
  todoListItem: {
    position: 'relative',
    fontSize: 24,
    borderBottom: '1px solid #ededed',
    ':lastChild': {
      borderBottom: 'none'
    },
    ':hover': {}, // needed for Radium.getState()
  },

  todoListItemEditing: {
    position: 'relative',
    fontSize: 24,
    borderBottom: 'none',
    padding: 0,
    ':lastChild': {
      borderBottom: 'none',
      marginBottom: -1,
    },
  },

  toggle: {
    textAlign: 'center',
    width: 40,
    height: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    //border: 'none',
    //WebkitAppearance: 'none',
    //appearance: 'none',
  },

  todoLabel: {
    wordBreak: 'break-all',
    padding: '15px 60px 15px 15px',
    marginLeft: 45,
    display: 'block',
    lineHeight: 1.2,
    transition: 'color 0.4s'
  },

  todoLabelCompleted: {
    wordBreak: 'break-all',
    padding: '15px 60px 15px 15px',
    marginLeft: 45,
    display: 'block',
    lineHeight: 1.2,
    transition: 'color 0.4s',
    color: '#d9d9d9',
    textDecoration: 'line-through'
  },

  todoTextInputEditing: {
    position: 'relative',
    margin: '0 0 0 43px',
    width: 506,
    fontFamily: 'inherit',
    fontSize: 24,
    fontWeight: 'inherit',
    lineHeight: '1.4em',
    border: '1px solid #999',
    boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    padding: '12px 16px',
    display: 'block',
  },

  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 10,
    bottom: 0,
    width: 40,
    height: 40,
    margin: 'auto 0',
    fontSize: 30,
    color: '#cc9a9a',
    transition: 'color 0.2s ease-out',
    cursor: 'pointer',
    ':hover': {
      color: '#af5b5e',
    },
  },
}


export default TodoItem
