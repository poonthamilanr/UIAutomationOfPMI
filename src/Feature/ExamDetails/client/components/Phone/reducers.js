import { combineReducers } from 'redux';
import * as apiActions from "foundation/Profile/client/Phone/actions";
import * as uiActions from "./actions";
import * as pageActions from "../ExamDetails/actions";

const isValid = (state = true, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_PHONES_SUCCESS:
    return Array.isArray(action.payload) && action.payload.length > 0;
  case apiActions.FETCH_PHONES_FAILURE:
    return false;
  case apiActions.UPDATE_PHONE_SUCCESS:
  case apiActions.CREATE_PHONE_SUCCESS:
    // case apiActions.SET_PRIMARY_PHONE_SUCCESS:
    return true;
  default:
    return state;
  }
};

const initialized = (state = false, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_PHONES_SUCCESS:
  case apiActions.FETCH_PHONES_FAILURE:
    return true;
  default:
    return state;
  }
};

const isOpen = (state = false, action = {}) => {
  switch (action.type) {
  case pageActions.OPEN_EXAM_DETAILS_PAGE_FORM:
    return action.payload === 'phone'
  case uiActions.PHONE_SET_UI_IS_OPEN:
    return action.payload;
  case apiActions.UPDATE_PHONE_SUCCESS:
  case apiActions.CREATE_PHONE_SUCCESS:
    // case apiActions.SET_PRIMARY_PHONE_SUCCESS:
    return false
  case apiActions.FETCH_PHONES_SUCCESS:
    return Array.isArray(action.payload) && (action.payload.length === 0 || !action.payload.some(phone => phone.isPrimary));
  default:
    return state;
  }
};

export default combineReducers({
  initialized,
  isValid,
  isOpen,
});