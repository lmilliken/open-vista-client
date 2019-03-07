import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { programTypes, users } from './sharedReducers';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  form: reduxFormReducer,
  shared: combineReducers({ programTypes: programTypes, users: users }),
});
