import { createAction } from "redux-actions";

export const FETCH_PROVIDERS_REQUEST = "FETCH_PROVIDERS_REQUEST";
export const FETCH_PROVIDERS_SUCCESS = "FETCH_PROVIDERS_SUCCESS";
export const FETCH_PROVIDERS_FAILURE = "FETCH_PROVIDERS_FAILURE";

export const fetchProviders = createAction(
  FETCH_PROVIDERS_REQUEST,
  data => data,
);
export const fetchProvidersSuccess = createAction(
  FETCH_PROVIDERS_SUCCESS,
  data => data,
);
export const fetchProvidersFailure = createAction(
  FETCH_PROVIDERS_FAILURE,
  data => data,
);
