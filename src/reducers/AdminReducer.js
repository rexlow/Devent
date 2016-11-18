import {
  APPROVE_EVENT_SUCCESSFUL,
  APPROVE_EVENT_FAIL,
  DISPROVE_EVENT_SUCCESSFUL,
  DISPROVE_EVENT_FAIL,
  RESET_APPROVE_MESSAGE
} from './../actions/types';

const INITIAL_STATE = { adminMessage: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPROVE_EVENT_SUCCESSFUL:
      return { ...state, adminMessage: "Event Approved!"};
    case APPROVE_EVENT_FAIL:
      return { ...state, adminMessage: "Sorry, please try again later!"};
    case DISPROVE_EVENT_SUCCESSFUL:
      return { ...state, adminMessage: "Event Disproved!"};
    case DISPROVE_EVENT_FAIL:
      return { ...state, adminMessage: "Sorry, please try again later!"};
    case RESET_APPROVE_MESSAGE:
      return INITIAL_STATE;
    default:
      return state;

  }
}
