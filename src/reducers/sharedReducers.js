import {
  FETCH_PROGRAM_TYPES_PENDING,
  FETCH_PROGRAM_TYPES_SUCCESS,
  FETCH_PROGRAM_TYPES_FAILURE,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_EXPERT_AREAS_PENDING,
  FETCH_EXPERT_AREAS_SUCCESS,
  FETCH_EXPERT_AREAS_FAILURE
} from '../actions/types';

const initalExpertAreasState = {
  expertAreas: [],
  isPending: false,
  error: ''
};
export function expertAreas(state = initalExpertAreasState, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_EXPERT_AREAS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case FETCH_EXPERT_AREAS_SUCCESS:
      return Object.assign({}, state, {
        expertAreas: action.payload,
        isPending: false
      });
    case FETCH_EXPERT_AREAS_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
}

const initalProgramTypeState = {
  types: [],
  isPending: false,
  error: ''
};
export function programTypes(state = initalProgramTypeState, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_PROGRAM_TYPES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case FETCH_PROGRAM_TYPES_SUCCESS:
      return Object.assign({}, state, {
        types: action.payload,
        isPending: false
      });
    case FETCH_PROGRAM_TYPES_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
}

const initalUsersState = {
  users: [],
  isPending: false,
  error: ''
};
export function users(state = initalUsersState, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload,
        isPending: false
      });
    case FETCH_USERS_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });

    default:
      return state;
  }
}

// export function masterError(){
//   switch(action.type){
//     case FETCH_USER_ERROR,
//     C
//   }
// }

export function flashMessage() {}

//old file
// import { FETCH_PROGRAM_TYPES, FETCH_USERS } from '../actions/types';

// export function programTypes(state = null, action) {
//   //console.log(action);
//   switch (action.type) {
//     case FETCH_PROGRAM_TYPES:
//       //   console.log('fetch user reducer');
//       return action.payload || false;
//     default:
//       return state;
//   }
// }

// export function users(state = null, action) {
//   //console.log(action);
//   switch (action.type) {
//     case FETCH_USERS:
//       // console.log('fetch user reducer');
//       return action.payload || false;
//     default:
//       return state;
//   }
// }
