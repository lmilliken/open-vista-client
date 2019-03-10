import {
  FETCH_PROGRAM_TYPES_PENDING,
  FETCH_PROGRAM_TYPES_SUCCESS,
  FETCH_PROGRAM_TYPES_FAILURE,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './types';
import axios from 'axios';

export const fetchProgramTypes = () => dispatch => {
  //  console.log('feeintg');
  dispatch({ type: FETCH_PROGRAM_TYPES_PENDING });

  axios
    .get('/api/programtypes')
    .then(res =>
      dispatch({ type: FETCH_PROGRAM_TYPES_SUCCESS, payload: res.data }),
    )
    .catch(e => dispatch({ type: FETCH_PROGRAM_TYPES_FAILURE, payload: e }));
};

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS_PENDING });

  axios
    .get('/api/users')
    .then(res => dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data }))
    .catch(e => dispatch({ type: FETCH_USERS_FAILURE, payload: e }));
};
