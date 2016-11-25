import _ from 'lodash';
import firebase from 'firebase';
import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  DID_PURCHASED,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
} from './types';

const didPurchasedMessage = {
  message: 'You have already purchased this ticket!'
}

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

export function buyTicket(eventID, remainingCredit) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/joinedEvent`)
      .once('value', snapshot => {
        //check if user bought this event
        if (_.isMatch(snapshot.val(), {[eventID]: true})) {
          dispatch({ type: DID_PURCHASED, payload: didPurchasedMessage })
        } else {
          firebase.database().ref(`/Users/${currentUser.uid}/joinedEvent`).update({ [eventID]: true })
            .then(() => {
              firebase.database().ref(`/Users/${currentUser.uid}`).update({ credit: remainingCredit })
                .then(() => dispatch({ type: BUY_TICKET_SUCCESS, payload: successMessage }) )
                .catch((error) => console.log(error))
             })
            .catch(() => dispatch({ type: BUY_TICKET_FAIL, payload: failMessage }));
          firebase.database().ref(`/Event/${eventID}/joinedUser`).update({ [currentUser.uid]: true })
            .then(() => console.log('update event parent'))
            .catch(() => console.log('error'));
        }
      })
  }
}
