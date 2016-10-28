import { Actions } from 'react-native-router-flux';

import {
   LOGIN_USER,
   REGISTER_USER,
   LISTEN_TO_USER,
   LOGOUT_USER,
 } from './../actions/types';

 const INITIAL_STATE = { user: null, error: null};

 export default (state = INITIAL_STATE, action) => {
   console.log(action);

   switch (action.type) {
     case LOGOUT_USER:
       return INITIAL_STATE;
     case LOGIN_USER:
       
     default:
       return state;
   }
 }
