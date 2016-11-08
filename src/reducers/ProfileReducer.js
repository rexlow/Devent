import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOADING,
  IMAGE_UPLOAD_FAIL
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = { url: null, error: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_SUCCESS:
      return {
        url: action.payload,
        error: null
      };
    case IMAGE_UPLOADING:
      return {
        uploading: true
      };
    case IMAGE_UPLOAD_FAIL:
      return INITIAL_STATE;
    case REHYDRATE:
      console.log('rehydrating')
      var incoming = action.payload;
      if(incoming){
        return { ...incoming}
      } else {
        console.log('something went wrong, rehydrate return default state')
        return state;
      }
    default:
      return INITIAL_STATE;
  };
};
