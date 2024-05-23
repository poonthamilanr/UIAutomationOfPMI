import { combineReducers } from 'redux';
import * as apiActions from "foundation/Application/client/Name/actions";
import * as uiActions from "./actions";
import * as pageActions from "../ExamDetails/actions";

const isValid = (state = true, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_NAME_ON_IDENTIFICATION_SUCCESS:
    return Boolean(action.payload && (action.payload.firstName || action.payload.lastName));
  case apiActions.FETCH_NAME_ON_IDENTIFICATION_FAILURE:
    return false;
  case apiActions.SAVE_NAME_ON_IDENTIFICATION_SUCCESS:
    return true;
  default:
    return state;
  }
};

const initialized = (state = false, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_NAME_ON_IDENTIFICATION_SUCCESS:
  case apiActions.FETCH_NAME_ON_IDENTIFICATION_FAILURE:
    return true;
  default:
    return state;
  }
};

const isOpen = (state = false, action = {}) => {
  switch (action.type) {
  case pageActions.OPEN_EXAM_DETAILS_PAGE_FORM:
    return action.payload === 'name'
  case uiActions.NAME_SET_UI_IS_OPEN:
    return action.payload;
  case apiActions.SAVE_NAME_ON_IDENTIFICATION_SUCCESS:
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
