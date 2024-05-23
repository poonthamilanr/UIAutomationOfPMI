import { createAction } from "redux-actions";

export const FETCH_ACCREDITED_UNIVERSITIES_REQUEST = "FETCH_ACCREDITED_UNIVERSITIES_REQUEST";
export const FETCH_ACCREDITED_UNIVERSITIES_SUCCESS = "FETCH_ACCREDITED_UNIVERSITIES_SUCCESS";
export const FETCH_ACCREDITED_UNIVERSITIES_FAILURE = "FETCH_ACCREDITED_UNIVERSITIES_FAILURE";

export const fetchAccreditedUniversities = createAction(
  FETCH_ACCREDITED_UNIVERSITIES_REQUEST,
  data => data,
);
export const fetchAccreditedUniversitiesSuccess = createAction(
  FETCH_ACCREDITED_UNIVERSITIES_SUCCESS,
  data => data,
);
export const fetchAccreditedUniversitiesFailure = createAction(
  FETCH_ACCREDITED_UNIVERSITIES_FAILURE,
  data => data,
);
