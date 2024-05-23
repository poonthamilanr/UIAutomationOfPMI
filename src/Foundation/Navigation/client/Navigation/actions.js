import { createAction } from "redux-actions";

export const FETCH_NAVIGATION_REQUEST = "FETCH_NAVIGATION_REQUEST";
export const FETCH_NAVIGATION_SUCCESS = "FETCH_NAVIGATION_SUCCESS";
export const FETCH_NAVIGATION_FAILURE = "FETCH_NAVIGATION__FAILURE";

export const fetchNavigation = createAction(FETCH_NAVIGATION_REQUEST, data => data);
export const fetchNavigationSuccess = createAction(FETCH_NAVIGATION_SUCCESS, data => data);
export const fetchNavigationFailure = createAction(FETCH_NAVIGATION_FAILURE, data => data);
