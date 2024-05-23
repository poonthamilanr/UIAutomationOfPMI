/* eslint-disable import/no-unresolved */
// import update from 'immutability-helper';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const applicationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_APPLICATION_FLOW_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_APPLICATION_FLOW_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_APPLICATION_FLOW_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default applicationReducer;