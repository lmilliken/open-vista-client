import {
  FETCH_PROGRAM_TYPES_PENDING,
  FETCH_PROGRAM_TYPES_SUCCESS,
  FETCH_PROGRAM_TYPES_FAILURE,
  FETCH_PROGRAMS_PENDING,
  FETCH_PROGRAMS_SUCCESS,
  FETCH_PROGRAMS_FAILURE,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_PROGRAM_PENDING,
  CREATE_PROGRAM_SUCCESS,
  CREATE_PROGRAM_ERROR,
} from './types';
import axios from 'axios';

export const createProgram = values => dispatch => {
  console.log('createProgram ', values);
  dispatch({ type: CREATE_PROGRAM_PENDING });

  axios
    .post('/api/programs/new', values)
    .then(res => dispatch({ type: CREATE_PROGRAM_SUCCESS, payload: res.data }))
    .catch(e => dispatch({ type: CREATE_PROGRAM_ERROR, payload: e }));
};

export const fetchPrograms = () => dispatch => {
  //  console.log('feeintg');
  dispatch({ type: FETCH_PROGRAMS_PENDING });

  axios
    .get('/api/programs')
    .then(res => dispatch({ type: FETCH_PROGRAMS_SUCCESS, payload: res.data }))
    .catch(e => dispatch({ type: FETCH_PROGRAMS_FAILURE, payload: e }));
};

export const fetchProgramTypes = () => dispatch => {
  //  console.log('feeintg');
  dispatch({ type: FETCH_PROGRAM_TYPES_PENDING });

  axios
    .get('/api/programtypes')
    .then(res => {
      dispatch({ type: FETCH_PROGRAM_TYPES_SUCCESS, payload: res.data });
    })
    .catch(e => dispatch({ type: FETCH_PROGRAM_TYPES_FAILURE, payload: e }));
};

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS_PENDING });

  axios
    .get('/api/users')
    .then(res => dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data }))
    .catch(e => dispatch({ type: FETCH_USERS_FAILURE, payload: e }));
};
