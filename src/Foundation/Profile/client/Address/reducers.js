// import update from 'immutability-helper';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const addressesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_ADDRESSES_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.SAVE_ADDRESS_SUCCESS:
  case actions.FETCH_ADDRESSES_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_ADDRESSES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  case actions.SAVE_ADDRESS_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SAVE_ADDRESS_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default addressesReducer;
