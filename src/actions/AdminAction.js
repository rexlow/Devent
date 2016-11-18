import firebase from 'firebase';
import {
  APPROVE_EVENT_SUCCESSFUL,
  APPROVE_EVENT_FAIL,
  DISPROVE_EVENT_SUCCESSFUL,
  DISPROVE_EVENT_FAIL,
  DELETE_EVENT_SUCCESSFUL,
  DELETE_EVENT_FAIL,
  RESET_APPROVE_MESSAGE
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

export function disproveEvent(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Event/${uid}`).update({
      approved: false
    })
      .then(() => dispatch({ type: DISPROVE_EVENT_SUCCESSFUL }))
      .catch((error) => dispatch({ type: DISPROVE_EVENT_FAIL }))
  };
}

export function deleteEvent(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Event/${uid}`).remove()
      .then(() => dispatch({ type: DELETE_EVENT_SUCCESSFUL }))
      .catch((error) => dispatch({ type: DELETE_EVENT_FAIL }))
  };
}

export function resetApproveMessage() {
  return {
    type: RESET_APPROVE_MESSAGE
  }
}
