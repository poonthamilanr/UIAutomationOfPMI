import { createAction } from "redux-actions";

export const FETCH_ADDRESS_REQUEST = "FETCH_APP_ADDRESS_REQUEST";
export const FETCH_ADDRESS_SUCCESS = "FETCH_APP_ADDRESS_SUCCESS";
export const FETCH_ADDRESS_FAILURE = "FETCH_APP_ADDRESS_FAILURE";
export const SAVE_ADDRESS_REQUEST = "SAVE_APP_ADDRESS_REQUEST";
export const SAVE_ADDRESS_SUCCESS = "SAVE_APP_ADDRESS_SUCCESS";
export const SAVE_ADDRESS_FAILURE = "SAVE_APP_ADDRESS_FAILURE";

export const fetchAddress = createAction(FETCH_ADDRESS_REQUEST, data => data);
export const fetchAddressSuccess = createAction(FETCH_ADDRESS_SUCCESS, data => data);
export const fetchAddressFailure = createAction(FETCH_ADDRESS_FAILURE, data => data);

export const saveAddress = createAction(SAVE_ADDRESS_REQUEST, data => data);
export const saveAddressSuccess = createAction(SAVE_ADDRESS_SUCCESS, data => data);
export const saveAddressFailure = createAction(SAVE_ADDRESS_FAILURE, data => data);
