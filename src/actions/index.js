import { FETCH_PROGRAM_TYPES, FETCH_USERS } from './types';
import axios from 'axios';

export const fetchProgramTypes = () => async dispatch => {
  //  console.log('feeintg');
  const response = await axios.get('/api/programtypes');
  // console.log({ response });
  dispatch({ type: FETCH_PROGRAM_TYPES, payload: response.data });
};

export const fetchUsers = () => async dispatch => {
  const response = await axios.get('/api/users');
  // console.log('response: ', response);
  dispatch({ type: FETCH_USERS, payload: response.data });
};
