import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER
 } from './types';

 export const emailChanged = (text) => {
   return {
     type: EMAIL_CHANGED,
     payload: text
   };
 };

 export const passwordChanged = (text) => {
   return {
     type: PASSWORD_CHANGED,
     payload: text
   };
 };

export const loginUser = ({ email, password}) => {
  return(dispatch) => {
    dispatch({ type: 'LOGIN_USER'});
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

export const isLoggedIn = (dispatch) => {
  return(dispatch) => {
    firebase.auth().onAuthStateChanged((user) => loginUserSuccess(dispatch, user));
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.mainContainer({ type: 'reset' });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
}
