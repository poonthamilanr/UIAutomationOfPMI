import { createAction } from "redux-actions";

export const FETCH_PROFILE_IMAGE_URL_REQUEST = "FETCH_PROFILE_IMAGE_URL_REQUEST";
export const FETCH_PROFILE_IMAGE_URL_SUCCESS = "FETCH_PROFILE_IMAGE_URL_SUCCESS";
export const FETCH_PROFILE_IMAGE_URL_FAILURE = "FETCH_PROFILE_IMAGE_URL_FAILURE";

export const fetchProfileImageUrl = createAction(FETCH_PROFILE_IMAGE_URL_REQUEST, data => data);
export const fetchProfileImageUrlSuccess = createAction(FETCH_PROFILE_IMAGE_URL_SUCCESS, data => data);
export const fetchProfileImageUrlFailure = createAction(FETCH_PROFILE_IMAGE_URL_FAILURE, data => data);
