import { createAction } from "redux-actions";

export const FETCH_ADDRESSES_REQUEST = "FETCH_PROFILE_ADDRESSES_REQUEST";
export const FETCH_ADDRESSES_SUCCESS = "FETCH_PROFILE_ADDRESSES_SUCCESS";
export const FETCH_ADDRESSES_FAILURE = "FETCH_PROFILE_ADDRESSES_FAILURE";
export const SELECT_ADDRESS = "SELECT_PROFILE_ADDRESS";
export const SAVE_ADDRESS_REQUEST = "SAVE_PROFILE_ADDRESS_REQUEST";
export const SAVE_ADDRESS_SUCCESS = "SAVE_PROFILE_ADDRESS_SUCCESS";
export const SAVE_ADDRESS_FAILURE = "SAVE_PROFILE_ADDRESS_FAILURE";

export const fetchAddresses = createAction(FETCH_ADDRESSES_REQUEST, data => data);
export const fetchAddressesSuccess = createAction(FETCH_ADDRESSES_SUCCESS, data => data);
export const fetchAddressesFailure = createAction(FETCH_ADDRESSES_FAILURE, data => data);

export const selectAddress = createAction(SELECT_ADDRESS, data => data);

export const saveAddress = createAction(SAVE_ADDRESS_REQUEST, data => data);
export const saveAddressSuccess = createAction(SAVE_ADDRESS_SUCCESS, data => data);
export const saveAddressFailure = createAction(SAVE_ADDRESS_FAILURE, data => data);
