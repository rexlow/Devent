import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL
} from './../actions/types';

const INITIAL_STATE = { url: null, error: null };

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case IMAGE_UPLOAD_SUCCESS:
      return action.payload;
    case IMAGE_UPLOAD_FAIL:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  };
};
