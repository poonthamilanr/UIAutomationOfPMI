import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const phoneReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_PHONES_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_PHONES_SUCCESS:
  case actions.CREATE_PHONE_SUCCESS:
  case actions.UPDATE_PHONE_SUCCESS:
  case actions.SET_PRIMARY_PHONE_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_PHONES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.CREATE_PHONE_REQUEST:
  case actions.UPDATE_PHONE_REQUEST:
  case actions.SET_PRIMARY_PHONE_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.CREATE_PHONE_FAILURE:
  case actions.UPDATE_PHONE_FAILURE:
  case actions.SET_PRIMARY_PHONE_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default phoneReducer;
