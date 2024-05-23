import { combineReducers } from 'redux';
import * as apiActions from "foundation/Application/client/Address/actions";
import * as uiActions from "./actions";
import * as pageActions from "../ExamDetails/actions";

const isValid = (state = true, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_ADDRESS_SUCCESS:
    return !!action.payload && !!action.payload.state && !!action.payload.city
  case apiActions.FETCH_ADDRESS_FAILURE:
    return false;
  case apiActions.SAVE_ADDRESS_SUCCESS:
    return true;
  default:
    return state;
  }
};

const initialized = (state = false, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_ADDRESS_SUCCESS:
  case apiActions.FETCH_ADDRESS_FAILURE:
    return true;
  default:
    return state;
  }
};

const isOpen = (state = false, action = {}) => {
  switch (action.type) {
  case pageActions.OPEN_EXAM_DETAILS_PAGE_FORM:
    return action.payload === 'address'
  case uiActions.ADDRESS_SET_UI_IS_OPEN:
    return action.payload;
  case apiActions.SAVE_ADDRESS_SUCCESS:
    return false
  default:
    return state;
  }
};

export default combineReducers({
  initialized,
  isValid,
  isOpen,
});
