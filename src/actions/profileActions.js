import axios from 'axios';
import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  AUTH_USER,
  AUTH_ERROR
} from './types';
import config from '../config';

export const signin = (formProps, callback) => async dispatch => {
  try {
    console.log('in signin action');
    const response = await axios.post(
      config.apidomain + '/auth/login',
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.user });
    localStorage.setItem('token', response.data.token);
    callback(); //to redirect user
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials.' });
  }
};

export const fetchUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch({ type: FETCH_USER_PENDING });
    axios
      .get(config.apidomain + '/auth/current_user', {
        headers: { authorization: token }
      })
      .then(res => {
        console.log('fetch user response', res.data);
        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
      })
      .catch(e => {
        console.log('fetch user error', e);
        dispatch({ type: FETCH_USER_ERROR, payload: e });
      });
  }

  //redux thunk working here:"So again redux thunk is really allowing us to bend the rules here and allowing us to manually dispatch an action at any point in time that we wish from an action creator rather than requiring us to (immediately) just flat out return it from the action creator."  This action creator is returning a function.  The purpose of this middleware (thunk) is to inspect what ever value we return this action creator if redux thunked sees that we return a function instead of a normal action redux thunk will automatically call this function and pass in that dispatch function as an argument. We do not want to dispatch an action until this API request has been completed. So we want to treat this thing like an asynchronous little piece of code and chain on a then statement because axios returns a promise and then once the promise is resolved only then will we actually dispatch an action and have that be sent off to all of our different reducers.
};

//old
// export const register = values => async dispatch => {
//   console.log('register action called', values);
//   const response = await axios.post('/api/register', values);
//   console.log({ response });
//   dispatch({ type: AUTH_USER, payload: response.data });
// };

// export const updateProfile = values => async dispatch => {
//   // console.log('update action called', values);
//   const response = await axios.post('/api/profile/update', values);
//   // console.log({ response });
//   dispatch({ type: FETCH_USER, payload: response.data });
// };

// export const agreeToTerms = () => async dispatch => {
//   // console.log('update action called', values);
//   const response = await axios.post('/api/agreetoterms');
//   console.log({ response });
//   dispatch({ type: FETCH_USER, payload: response.data });
// };
