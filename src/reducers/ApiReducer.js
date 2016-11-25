import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  DID_PURCHASED,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
  SET_USER_GROUP,
  EDIT_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESSFUL,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD_SUCCESSFUL,
  UPDATE_USER_PASSWORD_FAIL
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { eventList: {}, trendingData: {}, message: null, isRefreshing: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PULL_EVENT_DATA:
      return { ...state, eventList: action.payload, message: null, isRefreshing: true };
    case PULL_TRENDING_DATA:
      return { ...state, trendingData: action.payload }
    case DID_PURCHASED:
      return { ...state, message: action.payload }
    case BUY_TICKET_SUCCESS:
      return { ...state, message: action.payload }
    case BUY_TICKET_FAIL:
      return { ...state, message: action.payload }
    case REHYDRATE:
      var incoming = action.payload.api; //return double object, one for online one for local
      if(incoming){
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}
