import { Actions } from 'react-native-router-flux';

import {
   LOGIN_USER,
   REGISTER_USER,
   REGISTER_USER_SUCCESS,
   LISTEN_TO_USER,
   LOGOUT_USER,
   AUTH_FAIL,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL
 } from './../actions/types';

 const INITIAL_STATE = { user: null, error: null}; // no user yet
 const EXIST_STATE = { user: {}, error: null }; //user already exist

 export default (state = INITIAL_STATE, action) => {
   console.log(action);

   switch (action.type) {
     case LISTEN_TO_USER:
       if(!action.payload) {
         return EXIST_STATE;
       }
       return {
         user: {
           email: action.payload.email,
           uid: action.payload.uid
         },
         error: null
       };
     case LOGIN_USER:
       return {
         user: {
           email: action.payload.email,
           uid: action.payload.uid
         },
         error: null
       };
     case REGISTER_USER_SUCCESS:
       return {
         user: {
           email: action.payload.email,
           uid: action.payload.uid
         },
         error: null
       };
     case AUTH_FAIL:
       return {
         error: action.payload.error
       }
     case LOGOUT_USER:
       Actions.auth({ type: 'reset' });
       return INITIAL_STATE;
     case RESET_PASSWORD_SUCCESS:
       return {
         message: action.payload
       }
     case RESET_PASSWORD_FAIL:
      return {
        message: action.payload
      }
     default:
       return state;
   }
 }
