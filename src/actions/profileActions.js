import axios from 'axios';
import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_USER
} from './types';
import config from '../config';
import queryString from 'query-string';

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

export const signout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: AUTH_USER, payload: '' });
  dispatch({ type: CLEAR_USER, payload: '' });
};

export const fetchUser = () => async dispatch => {
  //they maybe coming back to the site after authenticating with Google with url.com?token=234lkj
  const queryToken = queryString.parse(window.location.search).token;
  console.log({ queryToken });
  const token = queryToken || localStorage.getItem('token');
  console.log({ token });
  if (token) {
    dispatch({ type: FETCH_USER_PENDING });
    axios
      .get(config.apidomain + '/auth/current_user', {
        headers: { authorization: token }
      })
      .then(res => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });

        //if a token is passed through the URL, set it in the store and local storage
        if (queryToken) {
          dispatch({ type: AUTH_USER, payload: queryToken });
          window.localStorage.setItem('token', queryToken);
        }
      })
      .catch(e => {
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
