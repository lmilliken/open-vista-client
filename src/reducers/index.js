import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { programTypes, users } from './sharedReducers';
import auth from './auth';
// import expertAreasReducer from './expertAreasReducer';
// import { requestStatuses } from './sharedReducers';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth,
  form: reduxFormReducer,
  shared: combineReducers({ programTypes, users })
});
