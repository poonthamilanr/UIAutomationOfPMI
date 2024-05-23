import { combineReducers } from 'redux';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import * as uiActions from "./actions";

const openRef = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.EXPERIENCE_SUBPROJECT_SET_UI_OPEN_REF:
    return action.payload;
  case apiActions.SAVE_SUBPROJECT_SUCCESS:
  case apiActions.DELETE_SUBPROJECT_SUCCESS:
    return null;
  default:
    return state;
  }
};

export default combineReducers({
  openRef,
});

