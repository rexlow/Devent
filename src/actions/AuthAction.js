import firebase from 'firebase';
import {
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

 export function listenToUser() {
   return (dispatch) => {
     firebase.auth().onAuthStateChanged((user) => {
       dispatch({
         type: LISTEN_TO_USER,
         payload: user
       });
     });
   };
 }
