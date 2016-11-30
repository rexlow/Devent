import firebase from 'firebase';
import {
   LOGIN_USER,
   LOGOUT_USER,
   REGISTER_USER,
   REGISTER_USER_SUCCESS,
   LISTEN_TO_USER,
   AUTH_FAIL,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL
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

 //create user reference onto the database upon registration
 function createUserRef(email, firstName, lastName) {
   const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}`).set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      userGroup: 'Normal User',
      credit: 0
    });
 };

 function updateUserProfile(firstName, lastName) {
   const user = firebase.auth().currentUser;
   user.updateProfile({
     displayName: [firstName] + ' ' + [lastName],
   })
     .then(() => console.log('Set displayName successful'))
     .catch((error) => console.log(error));
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

 export function registerUser(email, password, firstName, lastName) {
   return (dispatch) => {
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        registerUserSuccess(dispatch, user)
        createUserRef(email, firstName, lastName)
        updateUserProfile(firstName, lastName)
      })
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

 export function resetPassword(email) {
   return (dispatch) => {
     firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: 'Email sent, please check your mailbox'
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_FAIL,
          payload: 'Unknown error occured, please make sure you have the correct email'
        });
      });
   };
 };
