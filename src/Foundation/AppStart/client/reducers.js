
import { combineReducers } from 'redux';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const statusReducer = (state = ApiStatus.Idle, action = {}) => {
  switch (action.type) {
  case actions.FETCH_APP_DATA_REQUEST:
  case actions.FETCH_APP_DATA_WITH_APP_REQUIREMENTS_REQUEST:
    return ApiStatus.Fetching;
  case actions.FETCH_APP_DATA_SUCCESS:
    return ApiStatus.Success;
  case actions.FETCH_APP_DATA_FAILURE:
    return ApiStatus.Failure;
  default:
    return state;
  }
};

export default combineReducers({
  status: statusReducer,
});
