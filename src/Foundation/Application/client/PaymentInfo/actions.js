import { createAction } from "redux-actions";

export const FETCH_PAYMENT_INFO_REQUEST = "FETCH_PAYMENT_INFO_REQUEST";
export const FETCH_PAYMENT_INFO_SUCCESS = "FETCH_PAYMENT_INFO_SUCCESS";
export const FETCH_PAYMENT_INFO_FAILURE = "FETCH_PAYMENT_INFO_FAILURE";


export const fetchPaymentInfoRequest = createAction(FETCH_PAYMENT_INFO_REQUEST, data => data);
export const fetchPaymentInfoSuccess = createAction(FETCH_PAYMENT_INFO_SUCCESS, data => data);
export const fetchPaymentInfoFailure = createAction(FETCH_PAYMENT_INFO_FAILURE, data => data);
