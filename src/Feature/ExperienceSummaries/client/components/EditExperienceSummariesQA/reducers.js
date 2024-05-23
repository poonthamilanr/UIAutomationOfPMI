import { combineReducers } from 'redux';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import * as apiActions from "foundation/Application/client/ExperienceSummaries/actions";
import * as uiActions from "./actions";

const initialState = {};

const openRefs = (state = initialState, action = {}) => {
  switch (action.type) {
  case uiActions.EDIT_EXPERIENCE_SUMMARIES_QA_SET_UI_OPEN_REF:
    return {
      ...state,
      [action.payload]: true,
    };
  case uiActions.EDIT_EXPERIENCE_SUMMARIES_QA_CLEAR_UI_OPEN_REF:
    return {
      ...state,
      [action.payload]: false,
    };
  case apiActions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_SUCCESS:
    return {
      ...state,
      [action.payload.questionLink]: false,
    };
  case apiActions.FETCH_OPEN_EXPERIENCE_SUMMARIES_SUCCESS:
    return action.payload.reduce((result, item) => (
      item && item._links && item._links.self && item._links.self.href && !isPageSimulation()
        ? ({ ...result, [item._links.self.href]: true })
        : result
    ), {});
  default:
    return state;
  }
};

export default combineReducers({
  openRefs,
});