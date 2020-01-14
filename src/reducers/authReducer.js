import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../actions/types';

// export function authUser(state = null, action) {
//   // console.log('auth reducer: ', action.type);
//   switch (action.type) {
//     case FETCH_USER:
//       return action.payload || false;
//     default:
//       return state;
//   }
// }

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
export function user(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return { ...state, isPending: true };
    case FETCH_USER_SUCCESS:
      return { ...state, user: action.payload, isPending: false };
    case FETCH_USER_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
}

// export function user(state = {}, action) {
//   switch (action.type) {
//     case FETCH_USER_PENDING:
//       return Object.assign({}, state, { isPending: true });
//     case FETCH_USER_SUCCESS:
//       return Object.assign({}, state, {
//         user: action.payload,
//         isPending: false
//       });
//     case FETCH_USER_ERROR:
//       return Object.assign({}, state, {
//         error: action.payload,
//         isPending: false
//       });
//     default:
//       return state;
//   }
// }
