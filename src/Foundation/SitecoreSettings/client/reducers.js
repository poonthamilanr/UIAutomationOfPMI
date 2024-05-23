import * as actions from "./actions";

const initialState = {
  globalSettings: null,
  listsSettings: null,
  navigationsSettings: null,
  footerSettings: null,
};

const sitecoreSettingsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.SET_LISTS_SETTINGS:
    return {
      ...state,
      listsSettings: action.payload,
    };
  case actions.SET_GLOBAL_SETTINGS:
    return {
      ...state,
      globalSettings: action.payload,
    };
  case actions.SET_REQUIREMENTS_SETTINGS:
    return {
      ...state,
      requirementsSettings: action.payload,
    };
  case actions.SET_NAVIGATIONS_SETTINGS:
    return {
      ...state,
      navigationsSettings: action.payload,
    };
  case actions.SET_FOOTER_SETTINGS:
    return {
      ...state,
      footerSettings: action.payload,
    };
  default:
    return state;
  }
};

export default sitecoreSettingsReducer;