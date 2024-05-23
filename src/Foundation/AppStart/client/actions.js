import { createAction } from "redux-actions";

export const FETCH_APP_DATA_REQUEST = "FETCH_APP_DATA_REQUEST";
export const FETCH_APP_DATA_WITH_APP_REQUIREMENTS_REQUEST = "FETCH_APP_DATA_WITH_APP_REQUIREMENTS_REQUEST";
export const FETCH_APP_DATA_SUCCESS = "FETCH_APP_DATA_SUCCESS";
export const FETCH_APP_DATA_FAILURE = "FETCH_APP_DATA_FAILURE";

export const fetchAppData = createAction(FETCH_APP_DATA_REQUEST, data => data);
export const fetchAppDataWithAppRequirements = createAction(FETCH_APP_DATA_WITH_APP_REQUIREMENTS_REQUEST, data => data);
export const fetchAppDataSuccess = createAction(FETCH_APP_DATA_SUCCESS, data => data);
export const fetchAppDataFailure = createAction(FETCH_APP_DATA_FAILURE, data => data);
