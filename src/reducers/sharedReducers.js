import { FETCH_PROGRAM_TYPES, FETCH_USERS } from '../actions/types';

export function programTypes(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_PROGRAM_TYPES:
      console.log('fetch type reducer', action);
      return action.payload || false;
    default:
      return state;
  }
}

export function users(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USERS:
      console.log('fetch user reducer', action);
      return action.payload || false;
    default:
      return state;
  }
}
