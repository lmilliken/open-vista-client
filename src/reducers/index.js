import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { programTypes, users } from './sharedReducers';
import authReducer from './authReducer';
// import expertAreasReducer from './expertAreasReducer';
// import { requestStatuses } from './sharedReducers';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  shared: combineReducers({ programTypes, users }),
});
