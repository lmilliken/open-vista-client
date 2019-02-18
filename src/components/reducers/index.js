import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { programTypes } from './sharedReducers';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  form: reduxFormReducer,
  shared: combineReducers({ programTypes }),
});
