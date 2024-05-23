import { createAction } from "redux-actions";

export const FETCH_ALL_COUNTRIES_REQUEST = "FETCH_ALL_COUNTRIES_REQUEST";
export const FETCH_ALL_COUNTRIES_SUCCESS = "FETCH_ALL_COUNTRIES_SUCCESS";
export const FETCH_ALL_COUNTRIES_FAILURE = "FETCH_ALL_COUNTRIES_FAILURE";
export const FETCH_FILTERED_COUNTRIES_REQUEST = "FETCH_FILTERED_COUNTRIES_REQUEST";
export const FETCH_FILTERED_COUNTRIES_SUCCESS = "FETCH_FILTERED_COUNTRIES_SUCCESS";
export const FETCH_FILTERED_COUNTRIES_FAILURE = "FETCH_FILTERED_COUNTRIES_FAILURE";
export const FETCH_FILTERED_STATES_REQUEST = "FETCH_FILTERED_STATES_REQUEST";
export const FETCH_FILTERED_STATES_SUCCESS = "FETCH_FILTERED_STATES_SUCCESS";
export const FETCH_FILTERED_STATES_FAILURE = "FETCH_FILTERED_STATES_FAILURE";

export const fetchAllCountries = createAction(
  FETCH_ALL_COUNTRIES_REQUEST,
  data => data,
);
export const fetchAllCountriesSuccess = createAction(
  FETCH_ALL_COUNTRIES_SUCCESS,
  data => data,
);
export const fetchAllCountriesFailure = createAction(
  FETCH_ALL_COUNTRIES_FAILURE,
  data => data,
);

export const fetchFilteredCountries = createAction(
  FETCH_FILTERED_COUNTRIES_REQUEST,
  data => data,
);
export const fetchFilteredCountriesSuccess = createAction(
  FETCH_FILTERED_COUNTRIES_SUCCESS,
  data => data,
);
export const fetchFilteredCountriesFailure = createAction(
  FETCH_FILTERED_COUNTRIES_FAILURE,
  data => data,
);

export const fetchFilteredStates = createAction(
  FETCH_FILTERED_STATES_REQUEST,
  data => data,
);
export const fetchFilteredStatesSuccess = createAction(
  FETCH_FILTERED_STATES_SUCCESS,
  data => data,
);
export const fetchFilteredStatesFailure = createAction(
  FETCH_FILTERED_STATES_FAILURE,
  data => data,
);
