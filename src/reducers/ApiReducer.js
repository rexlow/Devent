import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PULL_EVENT_DATA:
      return action.payload;
    case PULL_TRENDING_DATA:
      return action.payload;
    case BUY_TICKET_SUCCESS:
      return { ...state, message: action.payload}
    case BUY_TICKET_FAIL:
      return { ...state, message: action.payload}
    case REHYDRATE:
      console.log('rehydrating')
      var incoming = action.payload.api;
      if(incoming){
        return { ...state, ...incoming}
      } else {
        console.log('something went wrong, rehydrate return default state')
        return state;
      }
    default:
      return state;
  }
}
