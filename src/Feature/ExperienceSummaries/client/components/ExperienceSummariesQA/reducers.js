import { combineReducers } from 'redux';
import * as apiActions from "foundation/Application/client/ExperienceSummaries/actions";
import * as uiActions from "./actions";

const openRef = (state = null, action = {}) => {
  switch (action.type) {
  case uiActions.EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF:
    return action.payload;
  case uiActions.EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF:
    return null;
  case apiActions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_SUCCESS:
    return null
  default:
    return state;
  }
};

export default combineReducers({
  openRef,
});
