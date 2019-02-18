import { FETCH_PROGRAM_TYPES } from '../actions/types';

export function programTypes(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_PROGRAM_TYPES:
      //   console.log('fetch user reducer');
      return action.payload || false;
    default:
      return state;
  }
}
