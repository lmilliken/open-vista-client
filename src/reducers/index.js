import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import programTypesReducer from './programTypeReducer';
// import expertAreasReducer from './expertAreasReducer';
// import { requestStatuses } from './sharedReducers';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  form: reduxFormReducer,
  shared: combineReducers({ programTypes: programTypesReducer }),
});
