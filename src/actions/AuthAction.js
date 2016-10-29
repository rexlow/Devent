import firebase from 'firebase';
import {
   LOGIN_USER,
   LOGOUT_USER,
   REGISTER_USER,
   LISTEN_TO_USER,
   LOGIN_USER_FAIL
 } from './types';

 export function loginUser(email, password) {
   console.log('asdsad')
   return (dispatch) => {
     firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        dispatch({
          type: LOGIN_USER,
          payload: {
            email,
            uid
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: {
            error: error.message
          }
        });
      });
   };
 }

 export function logoutUser() {
   firebase.auth().signOut();
   return {
     type: LOGOUT_USER
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
