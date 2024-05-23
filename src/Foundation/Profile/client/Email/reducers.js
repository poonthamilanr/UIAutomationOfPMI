// import update from 'immutability-helper';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const emailReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_EMAIL_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_EMAIL_SUCCESS:
  case actions.UPDATE_EMAIL_SUCCESS:
  case actions.CREATE_EMAIL_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_EMAIL_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.UPDATE_EMAIL_REQUEST:
  case actions.CREATE_EMAIL_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.UPDATE_EMAIL_FAILURE:
  case actions.CREATE_EMAIL_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default emailReducer;
