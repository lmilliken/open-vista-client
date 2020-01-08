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
  FETCH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_EXPERT_AREAS_PENDING,
  FETCH_EXPERT_AREAS_SUCCESS,
  FETCH_EXPERT_AREAS_FAILURE
} from './types';
import queryString from 'query-string';
import config from '../config';
import axios from 'axios';

export * from './profileActions';

//formProps = { email, password }
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      config.apidomain + '/auth/register',
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback(); //to redirect user
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Choose another email.' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      config.apidomain + '/auth/login',
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback(); //to redirect user
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials.' });
  }
};

//check the authentication token that was sent as a callback in the url: ...com?token=lkjsdlfkjsdf
export const checkAuthToken = () => async dispatch => {
  var query = queryString.parse(window.location.search);
  if (query.token) {
    dispatch({ type: AUTH_USER, payload: query.token });
    window.localStorage.setItem('token', query.token);
    console.log('got an token', query.token);
    // this.props.history.push('/');
  }
};

export const checkBrowerToken = () => async dispatch => {
  var query = queryString.parse(window.location.search);
  if (query.token) {
    dispatch({ type: AUTH_USER, payload: query.token });
    window.localStorage.setItem('token', query.token);
    console.log('got an token', query.token);
    // this.props.history.push('/');
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return { type: AUTH_USER, payload: '' };
};

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/auth/current_user');

  console.log('fetch user action: ', response.data);
  dispatch({ type: FETCH_USER, payload: response.data }); //redux thunk working here:"So again redux thunk is really allowing us to bend the rules here and allowing us to manually dispatch an action at any point in time that we wish from an action creator rather than requiring us to (immediately) just flat out return it from the action creator."  This action creator is returning a function.  The purpose of this middleware (thunk) is to inspect what ever value we return this action creator if redux thunked sees that we return a function instead of a normal action redux thunk will automatically call this function and pass in that dispatch function as an argument. We do not want to dispatch an action until this API request has been completed. So we want to treat this thing like an asynchronous little piece of code and chain on a then statement because axios returns a promise and then once the promise is resolved only then will we actually dispatch an action and have that be sent off to all of our different reducers.
};

// export const fetchExpertAreas = () => async dispatch => {
//   const response = await axios.get('/api/expertareas');
//   dispatch({ type: FETCH_EXPERT_AREAS, payload: response.data });
// };

export const fetchExpertAreas = () => dispatch => {
  dispatch({ type: FETCH_EXPERT_AREAS_PENDING });
  axios
    .get(config.apidomain + '/api/expertareas')
    .then(res => {
      dispatch({ type: FETCH_EXPERT_AREAS_SUCCESS, payload: res.data });
    })
    .catch(e => dispatch({ type: FETCH_EXPERT_AREAS_FAILURE, payload: e }));
};

export const createProgram = values => dispatch => {
  console.log('createProgram ', values);
  dispatch({ type: CREATE_PROGRAM_PENDING });

  axios
    .post('/api/programs/new', values)
    .then(res => dispatch({ type: CREATE_PROGRAM_SUCCESS, payload: res.data }))
    .catch(e => dispatch({ type: CREATE_PROGRAM_ERROR, payload: e }));
};

// marked for deletion
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
