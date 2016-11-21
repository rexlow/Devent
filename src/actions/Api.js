import _ from 'lodash';
import firebase from 'firebase';
import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
} from './types';

const successMessage = {
  message: 'Yay, see ya!'
};

const failMessage = {
  message: 'Something went wrong, please try again later'
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
    firebase.database().ref(`/Trending`).orderByValue()
      .on('value', snapshot => {
        dispatch({
          type: PULL_TRENDING_DATA,
          payload: snapshot.val()
        });
      });
  };
};

export function buyTicket(eventID) {
  console.log(eventID);
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
