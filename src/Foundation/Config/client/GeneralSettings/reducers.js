import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const fetchGeneralSettingsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_GENERAL_SETTINGS_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_GENERAL_SETTINGS_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_GENERAL_SETTINGS_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default fetchGeneralSettingsReducer;