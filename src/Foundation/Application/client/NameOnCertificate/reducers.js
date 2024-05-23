import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

export const nameOnCertificateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_NAME_ON_CERTIFICATE_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_NAME_ON_CERTIFICATE_SUCCESS:
  case actions.SAVE_NAME_ON_CERTIFICATE_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_NAME_ON_CERTIFICATE_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_NAME_ON_CERTIFICATE_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_NAME_ON_CERTIFICATE_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};
