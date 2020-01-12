import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { programTypes, users, expertAreas } from './sharedReducers';
import { token, user } from './authReducer';
// import expertAreasReducer from './expertAreasReducer';
// import { requestStatuses } from './sharedReducers';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: combineReducers({ token, user }),
  form: reduxFormReducer,
  shared: combineReducers({ programTypes, users, expertAreas })
});
