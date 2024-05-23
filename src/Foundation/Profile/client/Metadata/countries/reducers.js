import { combineReducers } from 'redux';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const allCountriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_ALL_COUNTRIES_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_ALL_COUNTRIES_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_ALL_COUNTRIES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

const filteredCountriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_FILTERED_COUNTRIES_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_FILTERED_COUNTRIES_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_FILTERED_COUNTRIES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

const filteredStatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.FETCH_FILTERED_STATES_REQUEST:
    return {
      ...state,
      status: ApiStatus.Fetching,
    };
  case actions.FETCH_FILTERED_STATES_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_FILTERED_STATES_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default combineReducers({
  all: allCountriesReducer,
  filtered: filteredCountriesReducer,
  filteredState: filteredStatesReducer,
});
