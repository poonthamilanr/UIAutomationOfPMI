import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const providersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_PROVIDERS_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_PROVIDERS_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_PROVIDERS_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default providersReducer;
