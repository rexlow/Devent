import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOADING,
  IMAGE_UPLOAD_FAIL,
  RESET_MESSAGE,
  RESET_ARTWORK,
  STORE_IMAGE_LOCALLY,
  STORE_ARTWORK_TEMPORARILY,
  SET_USER_GROUP,
  EDIT_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESSFUL,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD_SUCCESSFUL,
  UPDATE_USER_PASSWORD_FAIL,
  EVENT_ADDED_SUCCESSFUL,
  EVENT_ADDED_FAIL
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = {
  url: null,
  error: null,
  localUserAvatar: null,
  eventArtwork: null,
  userGroup: null,
  userType: null,
  message: null
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, url: action.payload, error: null }
    case IMAGE_UPLOADING:
      return {
        uploading: true
      };
    case IMAGE_UPLOAD_FAIL:
      return INITIAL_STATE;
    case RESET_MESSAGE:
      return { ...state, message: null }
    case RESET_ARTWORK:
      return { ...state, eventArtwork: null }
    case STORE_IMAGE_LOCALLY:
      return { ...state, localUserAvatar: action.payload.uri }
    case STORE_ARTWORK_TEMPORARILY:
      return { ...state, eventArtwork: action.payload.uri }
    case SET_USER_GROUP:
      return { ...state, userGroup: action.payload, userType: action.payload.userGroup }
    case UPDATE_USER_PROFILE_SUCCESSFUL:
      return { ...state, userGroup: { firstName: action.payload.userGroup.firstName, lastName: action.payload.userGroup.lastName }, message: action.payload.profileUpdate.message}
    case UPDATE_USER_PROFILE_FAIL:
      return { ...state, message: action.payload}
    case UPDATE_USER_PASSWORD_SUCCESSFUL:
      return { ...state, message: action.payload}
    case UPDATE_USER_PASSWORD_FAIL:
      return { ...state, message: action.payload}
    case EVENT_ADDED_SUCCESSFUL:
      return { ...state, message: action.payload}
    case EVENT_ADDED_FAIL:
      return { ...state, message: action.payload}
    case REHYDRATE:
      var incoming = action.payload.profile;
      if(incoming){
        return { ...state, ...incoming}
      } else {
        return state;
      }
    default:
      return state;
  };
};
