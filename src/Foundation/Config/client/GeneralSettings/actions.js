import { createAction } from "redux-actions";

export const FETCH_GENERAL_SETTINGS_REQUEST = "FETCH_GENERAL_SETTINGS_REQUEST";
export const FETCH_GENERAL_SETTINGS_SUCCESS = "FETCH_GENERAL_SETTINGS_SUCCESS";
export const FETCH_GENERAL_SETTINGS_FAILURE = "FETCH_GENERAL_SETTINGS_FAILURE";


export const fetchGeneralSettingsRequest = createAction(FETCH_GENERAL_SETTINGS_REQUEST, data => data);
export const fetchGeneralSettingsSuccess = createAction(FETCH_GENERAL_SETTINGS_SUCCESS, data => data);
export const fetchGeneralSettingsFailure = createAction(FETCH_GENERAL_SETTINGS_FAILURE, data => data);
