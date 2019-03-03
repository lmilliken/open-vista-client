import { FETCH_PROGRAM_TYPES } from './types';
import axios from 'axios';

export const fetchProgramTypes = () => async dispatch => {
  const response = await axios.get('/api/programtypes');
  // console.log({ response });
  dispatch({ type: FETCH_PROGRAM_TYPES, payload: response.data });
};
