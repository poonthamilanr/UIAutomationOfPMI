import { createAction } from "redux-actions";

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";
export const SAVE_PROFILE_REQUEST = "SAVE_PROFILE_REQUEST";
export const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";
export const SAVE_PROFILE_FAILURE = "SAVE_PROFILE_FAILURE";

export const fetchProfile = createAction(FETCH_PROFILE_REQUEST, data => data);
export const fetchProfileSuccess = createAction(FETCH_PROFILE_SUCCESS, data => data);
export const fetchProfileFailure = createAction(FETCH_PROFILE_FAILURE, data => data);

export const saveProfile = createAction(SAVE_PROFILE_REQUEST, data => data);
export const saveProfileSuccess = createAction(SAVE_PROFILE_SUCCESS, data => data);
export const saveProfileFailure = createAction(SAVE_PROFILE_FAILURE, data => data);
