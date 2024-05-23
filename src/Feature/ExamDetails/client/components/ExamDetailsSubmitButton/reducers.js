import * as uiActions from "./actions";

const initialState = false;

const submitAppInitiatedReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case uiActions.SUBMIT_APP_INITIATED_SET:
    return true;
  case uiActions.SUBMIT_APP_INITIATED_RESET:
    return false;
  default:
    return state;
  }
};

export default submitAppInitiatedReducer;
