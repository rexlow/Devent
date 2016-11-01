import {
  PULL_EVENT_DATA
} from './../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PULL_EVENT_DATA:
      return action.payload;
    default:
      return state;
  }
}
