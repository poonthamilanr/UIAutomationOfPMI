import { combineReducers } from 'redux';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import * as uiActions from "./actions";

const openRef = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.EXPERIENCE_PROGRAM_SET_UI_OPEN_REF:
    return action.payload;
  case apiActions.SAVE_EXPERIENCE_SUCCESS:
  case apiActions.BUFFER_EXPERIENCE_SUCCESS:
  case apiActions.DELETE_EXPERIENCE_SUCCESS:
    return null;
  default:
    return state;
  }
};

const openSubRef = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.EXPERIENCE_PROGRAM_SET_UI_OPEN_SUB_REF:
    return action.payload;
  case uiActions.EXPERIENCE_PROGRAM_SET_UI_OPEN_REF:
    return null;
  case apiActions.BUFFER_EXPERIENCE_SUCCESS:
    return action.payload._links.self.href;
  case apiActions.SAVE_COMPLETE_EXPERIENCE_SUCCESS:
  case apiActions.DELETE_EXPERIENCE_SUCCESS:
    return null;
  default:
    return state;
  }
};

export default combineReducers({
  openRef,
  openSubRef,
});

