import { combineReducers } from 'redux';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import * as uiActions from "./actions";

const openRef = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.EXPERIENCE_PROJECT_SET_UI_OPEN_REF:
    return action.payload;
  case apiActions.SAVE_EXPERIENCE_SUCCESS:
  case apiActions.DELETE_EXPERIENCE_SUCCESS:
    return null;
  default:
    return state;
  }
};

export default combineReducers({
  openRef,
});

