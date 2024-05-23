import { createAction } from "redux-actions";

export const FETCH_EMAIL_REQUEST = "FETCH_EMAIL_REQUEST";
export const FETCH_EMAIL_SUCCESS = "FETCH_EMAIL_SUCCESS";
export const FETCH_EMAIL_FAILURE = "FETCH_EMAIL_FAILURE";
export const UPDATE_EMAIL_REQUEST = "UPDATE_EMAIL_REQUEST";
export const UPDATE_EMAIL_SUCCESS = "UPDATE_EMAIL_SUCCESS";
export const UPDATE_EMAIL_FAILURE = "UPDATE_EMAIL_FAILURE";
export const CREATE_EMAIL_REQUEST = "CREATE_EMAIL_REQUEST";
export const CREATE_EMAIL_SUCCESS = "CREATE_EMAIL_SUCCESS";
export const CREATE_EMAIL_FAILURE = "CREATE_EMAIL_FAILURE";

export const fetchEmail = createAction(FETCH_EMAIL_REQUEST, data => data);
export const fetchEmailSuccess = createAction(FETCH_EMAIL_SUCCESS, data => data);
export const fetchEmailFailure = createAction(FETCH_EMAIL_FAILURE, data => data);

export const updateEmail = createAction(UPDATE_EMAIL_REQUEST, data => data);
export const updateEmailSuccess = createAction(UPDATE_EMAIL_SUCCESS, data => data);
export const updateEmailFailure = createAction(UPDATE_EMAIL_FAILURE, data => data);

export const createEmail = createAction(CREATE_EMAIL_REQUEST, data => data);
export const createEmailSuccess = createAction(CREATE_EMAIL_SUCCESS, data => data);
export const createEmailFailure = createAction(CREATE_EMAIL_FAILURE, data => data);
