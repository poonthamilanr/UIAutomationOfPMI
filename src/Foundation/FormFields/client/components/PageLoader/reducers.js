import * as uiActions from "./actions";

export const pageLoaderReducer = (state = false, action = {}) => {
  switch (action.type) {
  case uiActions.SHOW_PAGE_LOADER:
    return true;
  case uiActions.HIDE_PAGE_LOADER:
    return false;
  default:
    return state;
  }
};