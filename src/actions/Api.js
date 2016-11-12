import _ from 'lodash';
import firebase from 'firebase';
import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
  SET_USER_GROUP,
  EDIT_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESSFUL,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD_SUCCESSFUL
} from './types';

const successMessage = {
  message: 'Yay, see ya!'
};

const failMessage = {
  message: 'Something went wrong, please try again later'
}

function updateUserDatabase(firstName, lastName) {
  const { currentUser } = firebase.auth();
   firebase.database().ref(`/Users/${currentUser.uid}`).set({
     firstName: firstName,
     lastName: lastName,
   });
};

//talk to database and get user group
export function getUserGroup() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users`)
      .once('value', snapshot => {
        var userData = _.values(snapshot.val());
        for (var i = 0; i < userData.length; i++) {
          if (userData[i].email === currentUser.email) {
            dispatch({
              type: SET_USER_GROUP,
              payload: userData[i]
            });
          };
        };
      });
  };
};

export function updateProfile(firstName, lastName, newPassword) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    if (newPassword !== '') {
      currentUser.updatePassword(newPassword)
        .then(() => console.log('change password successful'))
        .catch((error) => console.log(error));
    }
    updateUserDatabase(firstName, lastName);
    currentUser.updateProfile({ displayName: [firstName] + ' ' [lastName] })
      .then(() => console.log('update name successful'))
      .catch((error) => console.log(error));
  }
}

export function pullEventData() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Event`)
      .on('value', snapshot => { //create real time listener
        dispatch({
          type: PULL_EVENT_DATA,
          payload: snapshot.val()
        });
      });
  };
};

export function pullTrendingData() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Trending`)
      .on('value', snapshot => {
        dispatch({
          type: PULL_TRENDING_DATA,
          payload: snapshot.val()
        });
      });
  };
};

export function buyTicket(eventID) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/joinedEvent`).update({ [eventID]: true })
      .then(() => dispatch({ type: BUY_TICKET_SUCCESS, payload: successMessage }))
      .catch(() => dispatch({ type: BUY_TICKET_FAIL, payload: failMessage }));
    firebase.database().ref(`/Event/${eventID}/joinedUser`).update({ [currentUser.uid]: true })
      .then(() => console.log('update event parent'))
      .catch(() => console.log('error'));
  };
};
