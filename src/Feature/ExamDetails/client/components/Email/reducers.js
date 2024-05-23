import { combineReducers } from 'redux';
import * as apiActions from "foundation/Profile/client/Email/actions";
import * as uiActions from "./actions";
import * as pageActions from "../ExamDetails/actions";

const isValid = (state = true, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_EMAIL_SUCCESS:
    return !!action.payload && action.payload.isPrimary;
  case apiActions.FETCH_EMAIL_FAILURE:
    return false;
  case apiActions.UPDATE_EMAIL_SUCCESS:
  case apiActions.CREATE_EMAIL_SUCCESS:
    return true;
  default:
    return state;
  }
};

const initialized = (state = false, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_EMAIL_SUCCESS:
  case apiActions.FETCH_EMAIL_FAILURE:
    return true;
  default:
    return state;
  }
};

const isOpen = (state = false, action = {}) => {
  switch (action.type) {
  case pageActions.OPEN_EXAM_DETAILS_PAGE_FORM:
    return action.payload === 'email'
  case uiActions.EMAIL_SET_UI_IS_OPEN:
    return action.payload;
  case apiActions.UPDATE_EMAIL_SUCCESS:
  case apiActions.CREATE_EMAIL_SUCCESS:
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
