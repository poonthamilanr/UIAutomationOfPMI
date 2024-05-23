import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
  error: null,
  accommodationStatus: ApiStatus.Idle,
};

const examLocationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.SAVE_EXAMLOCATION_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
      accommodationStatus: ApiStatus.Idle,
    };
  case actions.SAVE_EXAMLOCATION_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
      error: null,
      accommodationStatus: ApiStatus.Idle,
    };
  case actions.SAVE_EXAMLOCATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
      error: action.payload,
      accommodationStatus: ApiStatus.Idle,
    };
  case actions.SAVE_EXAMACCOMMODATION_SUCCESS:
    return {
      entity: action.payload,
      accommodationStatus: ApiStatus.Success,
      status: ApiStatus.Idle,
    };
  case actions.SAVE_EXAMACCOMMODATION_REQUEST:
    return {
      ...state,
      accommodationStatus: ApiStatus.Submitting,
      error: null,
      status: ApiStatus.Idle,
    };
  case actions.SAVE_EXAMACCOMMODATION_FAILURE:
    return {
      ...state,
      accommodationStatus: ApiStatus.Failure,
      error: action.payload,
      status: ApiStatus.Idle,
    };
  default:
    return state;
  }
};

export default examLocationReducer;
