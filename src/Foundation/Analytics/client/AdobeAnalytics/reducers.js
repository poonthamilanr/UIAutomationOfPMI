import * as actions from "./actions";

const defaultStatus = {
  viewedPageName: null,
  isScreenLoad: false,
};

export default (state = defaultStatus, action = {}) => {
  switch (action.type) {
  case actions.TRACK_PAGE_VIEW:
    return {
      ...state,
      viewedPageName: action.payload.pageName,
    };
  case actions.SET_SCREEN_LOAD:
    return {
      ...state,
      isScreenLoad: action.payload,
    };
  default:
    return state;
  }
};
