import {
  PULL_EVENT_DATA,
  PULL_TRENDING_DATA,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAIL,
  SET_USER_GROUP
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { eventList: {}, trendingData: {}, message: null, isRefreshing: false, userGroup: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PULL_EVENT_DATA:
      return { ...state, eventList: action.payload, message: null, isRefreshing: true };
    case PULL_TRENDING_DATA:
      return { ...state, trendingData: action.payload }
    case BUY_TICKET_SUCCESS:
      return { ...state, message: action.payload }
    case BUY_TICKET_FAIL:
      return { ...state, message: action.payload }
    case SET_USER_GROUP:
      return { ...state, userGroup: action.payload }
    case REHYDRATE:
      console.log('Api rehydrating')
      var incoming = action.payload.api; //return double object, one for online one for local
      if(incoming){
        return { ...state, ...incoming }
      } else {
        console.log('something went wrong, rehydrate return default state')
        return state;
      }
    default:
      return state;
  }
}
