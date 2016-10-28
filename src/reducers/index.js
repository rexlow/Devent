import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

//return app state
export default combineReducers({
  auth: AuthReducer
})
