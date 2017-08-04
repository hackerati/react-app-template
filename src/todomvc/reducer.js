'use strict';

import { List } from 'immutable'

export default function reducer (state = List ([]), action) {
  switch (action.type) {
    default:
      // just return the same state
      return (state)
  }
}
