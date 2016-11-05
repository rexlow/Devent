import firebase from 'firebase';
import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL
} from './types';

export function pullEventData() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Event`)
      .on('value', snapshot => {
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
      .then(() => console.log('bought'))
      .catch((error) => console.log(error)),
    firebase.database().ref(`/Event/${eventID}/joinedUser`).update({ [currentUser.uid]: true })
      .then(() => console.log('update event parent'))
      .catch((error) => console.log('eror'));
  };
};

function updateEventList(eventID) {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/Event/${eventID}/joinedUser`).update({ [currentUser.email]: true })
    .then(() => console.log('update event parent'))
    .catch((error) => console.log('eror'));
};
