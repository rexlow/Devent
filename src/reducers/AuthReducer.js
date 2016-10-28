import { Actions } from 'react-native-router-flux';

import {
   LOGIN_USER,
   REGISTER_USER,
   LISTEN_TO_USER,
   LOGOUT_USER,
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
       
     case LOGOUT_USER:
       return INITIAL_STATE;
     default:
       return state;
   }
 }
