import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { programTypes, users, expertAreas } from './sharedReducers';
import { authUser, token } from './authReducer';
// import expertAreasReducer from './expertAreasReducer';
// import { requestStatuses } from './sharedReducers';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: combineReducers({ token, authUser }),
  form: reduxFormReducer,
  shared: combineReducers({ programTypes, users, expertAreas })
});
