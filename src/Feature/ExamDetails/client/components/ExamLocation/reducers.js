import { combineReducers } from 'redux';
import * as uiActions from "./actions";

const isValid = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.EXAM_LOCATION_SET_VALIDITY:
    return !!action.payload
  default:
    return state;
  }
};

const initialized = () => true;

export default combineReducers({
  initialized,
  isValid,
});
