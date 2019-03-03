import { FETCH_PROGRAM_TYPES } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_PROGRAM_TYPES:
      return action.payload;
    default:
      return state;
  }
};
