import { createAction } from "redux-actions";

export const FETCH_PHONES_REQUEST = "FETCH_PHONES_REQUEST";
export const FETCH_PHONES_SUCCESS = "FETCH_PHONES_SUCCESS";
export const FETCH_PHONES_FAILURE = "FETCH_PHONES_FAILURE";
export const CREATE_PHONE_REQUEST = "CREATE_PHONE_REQUEST";
export const CREATE_PHONE_SUCCESS = "CREATE_PHONE_SUCCESS";
export const CREATE_PHONE_FAILURE = "CREATE_PHONE_FAILURE";
export const UPDATE_PHONE_REQUEST = "UPDATE_PHONE_REQUEST";
export const UPDATE_PHONE_SUCCESS = "UPDATE_PHONE_SUCCESS";
export const UPDATE_PHONE_FAILURE = "UPDATE_PHONE_FAILURE";
export const SET_PRIMARY_PHONE_REQUEST = "SET_PRIMARY_PHONE_REQUEST";
export const SET_PRIMARY_PHONE_SUCCESS = "SET_PRIMARY_PHONE_SUCCESS";
export const SET_PRIMARY_PHONE_FAILURE = "SET_PRIMARY_PHONE_FAILURE";

export const fetchPhones = createAction(FETCH_PHONES_REQUEST, data => data);
export const fetchPhonesSuccess = createAction(FETCH_PHONES_SUCCESS, data => data);
export const fetchPhonesFailure = createAction(FETCH_PHONES_FAILURE, data => data);

export const createPhone = createAction(CREATE_PHONE_REQUEST, data => data);
export const createPhoneSuccess = createAction(CREATE_PHONE_SUCCESS, data => data);
export const createPhoneFailure = createAction(CREATE_PHONE_FAILURE, data => data);

export const updatePhone = createAction(UPDATE_PHONE_REQUEST, data => data);
export const updatePhoneSuccess = createAction(UPDATE_PHONE_SUCCESS, data => data);
export const updatePhoneFailure = createAction(UPDATE_PHONE_FAILURE, data => data);

export const setPrimaryPhone = createAction(SET_PRIMARY_PHONE_REQUEST, data => data);
export const setPrimarySuccess = createAction(SET_PRIMARY_PHONE_SUCCESS, data => data);
export const setPrimaryFailure = createAction(SET_PRIMARY_PHONE_FAILURE, data => data);


