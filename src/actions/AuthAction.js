import firebase from 'firebase';
import {
   LOGIN_USER,
   LOGOUT_USER,
   REGISTER_USER,
   REGISTER_USER_SUCCESS,
   LISTEN_TO_USER,
   AUTH_FAIL
 } from './types';

 const loginUserSuccess = (dispatch, user) => {
   dispatch({
     type: LOGIN_USER,
     payload: user
   });
 };

 const registerUserSuccess = (dispatch, user) => {
   dispatch({
     type: REGISTER_USER_SUCCESS,
     payload: user
   });
 };

 const authFail = (dispatch, error) => {
   dispatch({
     type: AUTH_FAIL,
     payload: {
       error: error.message
     }
   });
 };

 export function loginUser(email, password) {
   return (dispatch) => {
     firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => authFail(dispatch, error));
   };
 };

 export function logoutUser() {
   firebase.auth().signOut();
   return {
     type: LOGOUT_USER
   };
 };

 export function registerUser(email, password) {
   return (dispatch) => {
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => registerUserSuccess(dispatch, user))
      .catch((error) => authFail(dispatch, error));
   };
 };

 export function listenToUser() {
   return (dispatch) => {
     firebase.auth().onAuthStateChanged((user) => {
       dispatch({
         type: LISTEN_TO_USER,
         payload: user
       });
     });
   };
 };
