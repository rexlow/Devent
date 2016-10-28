import firebase from 'firebase';
import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER,
   REGISTER_USER,
   LISTEN_TO_USER
 } from './types';

 export function loginUser(email, password) {
   return {
     type: LOGIN_USER,
     payload: {
       email,
       password
     }
   };
 }

 export function registerUser(email, password) {
   return {
     type: REGISTER_USER,
     payload: {
       email,
       password
     }
   };
 }

 export function subscribeAuthStatus() {
   return (dispatch) => {
     firebase.auth().onAuthStateChanged((user) => {
       dispatch({
         type: LISTEN_TO_USER,
         payload: user
       });
     });
   };
 }
