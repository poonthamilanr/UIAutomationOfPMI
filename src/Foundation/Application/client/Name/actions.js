import { createAction } from "redux-actions";

export const FETCH_NAME_ON_IDENTIFICATION_REQUEST = "FETCH_NAME_ON_IDENTIFICATION_REQUEST";
export const FETCH_NAME_ON_IDENTIFICATION_SUCCESS = "FETCH_NAME_ON_IDENTIFICATION_SUCCESS";
export const FETCH_NAME_ON_IDENTIFICATION_FAILURE = "FETCH_NAME_ON_IDENTIFICATION_FAILURE";
export const SAVE_NAME_ON_IDENTIFICATION_REQUEST = "SAVE_NAME_ON_IDENTIFICATION_REQUEST";
export const SAVE_NAME_ON_IDENTIFICATION_SUCCESS = "SAVE_NAME_ON_IDENTIFICATION_SUCCESS";
export const SAVE_NAME_ON_IDENTIFICATION_FAILURE = "SAVE_NAME_ON_IDENTIFICATION_FAILURE";

export const fetchNameOnIdentification = createAction(FETCH_NAME_ON_IDENTIFICATION_REQUEST, data => data);
export const fetchNameOnIdentificationSuccess = createAction(FETCH_NAME_ON_IDENTIFICATION_SUCCESS, data => data);
export const fetchNameOnIdentificationFailure = createAction(FETCH_NAME_ON_IDENTIFICATION_FAILURE, data => data);

export const saveNameOnIdentification = createAction(SAVE_NAME_ON_IDENTIFICATION_REQUEST, data => data);
export const saveNameOnIdentificationSuccess = createAction(SAVE_NAME_ON_IDENTIFICATION_SUCCESS, data => data);
export const saveNameOnIdentificationFailure = createAction(SAVE_NAME_ON_IDENTIFICATION_FAILURE, data => data);
