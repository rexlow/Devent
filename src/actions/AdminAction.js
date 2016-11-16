import firebase from 'firebase';
import {
  APPROVE_EVENT_SUCCESSFUL,
  APPROVE_EVENT_FAIL,
} from './types';

export function approveEvent(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Event/${uid}`).update({
      approved: true
    })
      .then(() => dispatch({ type: APPROVE_EVENT_SUCCESSFUL }))
      .catch((error) => dispatch({ type: APPROVE_EVENT_FAIL }))
  };
};
