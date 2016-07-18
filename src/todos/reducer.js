'use strict'

import { List, Map } from 'immutable'
import uuid from 'uuid'
import * as types from './ActionTypes'

export default function reducer (state = List ([]), action) {
    switch (action.type) {
    case types.ADD:
        return (state.push (Map ({
           id: uuid.v4(),
	   description: action.description,
	   completed: false,
	})))
    case types.DELETE:
        return (state.filter ( todo => todo.get('id') !== action.id ))
    case types.EDIT:
        return (state.map (todo => todo.get('id') === action.id ?
                           todo.set ('description', action.description) : todo))
    case types.COMPLETE:
        return (state.map (todo => todo.get('id') === action.id ?
                           todo.set ('completed', !todo.get('completed')) : todo))
    case types.COMPLETE_ALL:
        const areAllMarked = state.every ( todo => todo.get('completed') )
        return (state.map (todo => todo.set ('completed', !areAllMarked)))
    case types.CLEAR_COMPLETED:
        return (state.filter ( todo => todo.get('completed') === false ))
    default:
        // just return the same state
        return (state)
    }
}
