import { FETCH_USER } from '../actions/types';
import { AUTH_USER, AUTH_ERROR } from '../actions/types';

export function authUser(state = null, action) {
  // console.log('auth reducer: ', action.type);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}

const INITIAL_STATE = {
  token: '',
  errorMessage: ''
};
export function token(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, token: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
