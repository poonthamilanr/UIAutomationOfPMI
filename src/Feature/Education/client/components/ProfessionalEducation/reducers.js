import { combineReducers } from 'redux';
import * as apiActions from 'foundation/Application/client/ProfessionalEducation/actions';
import * as uiActions from "./actions";

const openRef = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.PROFESSIONAL_EDUCATION_SET_UI_OPEN_REF:
    return action.payload;
  case apiActions.SAVE_PROFESSIONAL_EDUCATION_SUCCESS:
  case apiActions.DELETE_PROFESSIONAL_EDUCATION_SUCCESS:
    return null;
  default:
    return state;
  }
};

export default combineReducers({
  openRef,
});

