import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ApiReducer from './ApiReducer'

//return app state
export default combineReducers({
  auth: AuthReducer,
  api: ApiReducer
})
