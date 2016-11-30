import _ from 'lodash';
import firebase from 'firebase';
import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOADING,
  IMAGE_UPLOAD_FAIL,
  RESET_MESSAGE,
  RESET_ARTWORK,
  STORE_IMAGE_LOCALLY,
  STORE_ARTWORK_TEMPORARILY,
  SET_USER_GROUP,
  UPDATE_USER_PROFILE_SUCCESSFUL,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD_SUCCESSFUL,
  UPDATE_USER_PASSWORD_FAIL,
  EVENT_ADDED_SUCCESSFUL,
  EVENT_ADDED_FAIL,
  BUY_CREDIT_SUCCESS,
  BUY_CREDIT_FAIL,
  SUBMIT_INTEREST_ITEM_SUCCESS,
  SUBMIT_INTEREST_ITEM_FAIL
} from './types';

const profileUpdate = {
  message: 'Your profile is being updated'
};

const passwordChangeSuccess = {
  message: 'Password updated'
};

const anomaly = {
  message: 'Something went wrong, please try again later'
};

const eventAddedSuccessful = {
  message: 'Congratz! You event is now being added'
};

export function resetMessage() {
  return {
    type: RESET_MESSAGE
  };
};

export function resetEventArtwork() {
  return {
    type: RESET_ARTWORK
  };
};

export function uploadImageSuccess(url) {
  return {
    type: IMAGE_UPLOAD_SUCCESS,
    payload: url
  };
};

export function uploadingImage() {
  return {
    type: IMAGE_UPLOADING
  };
};

export function storeAvatar(source) {
  return {
    type: STORE_IMAGE_LOCALLY,
    payload: source
  };
};

//dont persist
export function storeArtwork(source) {
  return {
    type: STORE_ARTWORK_TEMPORARILY,
    payload: source
  };
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
        .then(() => dispatch({ type: UPDATE_USER_PASSWORD_SUCCESSFUL, payload: passwordChangeSuccess }))
        .catch((error) => dispatch({ type: UPDATE_USER_PASSWORD_FAIL, payload: error.message }));
    }
    //update user database
    firebase.database().ref(`/Users/${currentUser.uid}`).update({
      firstName: firstName,
      lastName: lastName,
    })
      .then(() => {
        currentUser.updateProfile({ displayName: [firstName] + ' ' + [lastName] })
          .then(() => dispatch({ type: UPDATE_USER_PROFILE_SUCCESSFUL, payload: {profileUpdate, userGroup: {firstName, lastName}}}))
          .catch((error) => dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: error.message }))
        })
      .catch((error) => dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: error.message }));
  }
}

export function submitEvent(title, date, time, organizer, cost, address, note, artwork) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Event/`).push({
      eventOwner: currentUser.uid,
      title: title,
      date: date,
      time: time,
      organizer: organizer,
      cost: cost,
      address: address,
      note: note,
      artwork: artwork,
      approved: false
    }).then(() => dispatch({ type: EVENT_ADDED_SUCCESSFUL, payload: eventAddedSuccessful }))
      .catch((error) => dispatch({ type: EVENT_ADDED_FAIL, payload: anomaly }))
  }
};

export function buyCredit(amount) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}`).update({
      credit: amount
    }).then(() => {
      dispatch({ type: BUY_CREDIT_SUCCESS, payload: amount })
    })
      .catch((error) => dispatch({ type: BUY_CREDIT_FAIL, payload: 'Purchase failed' }))
  };
};

export function submitInterestItem(item, trendingData) {
  const { currentUser } = firebase.auth();

  var update = {};
  Object.keys(item).forEach((key) => {
    update['item' + (Number(key) + 1)] = item[key]
  });

  var newUpdates = {}
  Object.keys(trendingData).forEach((key) => {
    newUpdates['item' + (Number(key) + 1)] = {
      title: trendingData[key][0],
      value: trendingData[key][1]
    }
  });

  Object.keys(newUpdates).forEach(
    (key) => update[key] && (newUpdates[key].value += 1)
  );

  return (dispatch) => {
    firebase.database().ref(`/`).update({
      Trending: newUpdates
    }).then(() => dispatch({ type: SUBMIT_INTEREST_ITEM_SUCCESS, payload: 'Thanks for your contribution to our database! Your will see more events of your choice!' }))
      .catch((error) => dispatch({ type: SUBMIT_INTEREST_ITEM_FAIL, payload: 'Update trending statistic fail' }))
  }
}
