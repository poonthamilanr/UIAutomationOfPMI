// import update from 'immutability-helper';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const navigationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_NAVIGATION_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_NAVIGATION_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_NAVIGATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default navigationReducer;
