import { combineReducers } from 'redux';
import * as apiActions from "foundation/Application/client/AcademicEducation/actions";
import * as uiActions from "./actions";
// import * as pageActions from "../Education/actions";

const isValid = (state = true, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_ACADEMIC_EDUCATION_SUCCESS:
    return !!action.payload
  case apiActions.FETCH_ACADEMIC_EDUCATION_FAILURE:
    return false;
  case apiActions.SAVE_ACADEMIC_EDUCATION_SUCCESS:
    return true;
  default:
    return state;
  }
};

const initialized = (state = false, action = {}) => {
  switch (action.type) {
  case apiActions.FETCH_ACADEMIC_EDUCATION_SUCCESS:
  case apiActions.FETCH_ACADEMIC_EDUCATION_FAILURE:
    return true;
  default:
    return state;
  }
};

const isOpen = (state = false, action = {}) => {
  switch (action.type) {
  // For accordion logic following 2 actions should be replaced with OPEN_EXAM_DETAILS_PAGE_FORM
  case apiActions.FETCH_ACADEMIC_EDUCATION_SUCCESS:
    return !action.payload
  case apiActions.FETCH_ACADEMIC_EDUCATION_FAILURE:
    return true;
    // case pageActions.OPEN_EXAM_DETAILS_PAGE_FORM:
    //   return action.payload === 'academic'

  case uiActions.ACADEMIC_EDUCATION_SET_UI_IS_OPEN:
    return action.payload;
  case apiActions.SAVE_ACADEMIC_EDUCATION_SUCCESS:
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

