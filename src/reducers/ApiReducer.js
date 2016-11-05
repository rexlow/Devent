import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL
} from './../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PULL_EVENT_DATA:
      return action.payload;
    case PULL_TRENDING_DATA:
      return action.payload;
    case BUY_TICKET_SUCCESS:
      return {
        message: action.payload
      };
    case BUY_TICKET_FAIL:
      return {
        message: action.payload
      };
    default:
      return state;
  }
}
