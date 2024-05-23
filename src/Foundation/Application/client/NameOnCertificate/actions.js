import { createAction } from "redux-actions";

export const FETCH_NAME_ON_CERTIFICATE_REQUEST = "FETCH_NAME_ON_CERTIFICATE_REQUEST";
export const FETCH_NAME_ON_CERTIFICATE_SUCCESS = "FETCH_NAME_ON_CERTIFICATE_SUCCESS";
export const FETCH_NAME_ON_CERTIFICATE_FAILURE = "FETCH_NAME_ON_CERTIFICATE_FAILURE";
export const SAVE_NAME_ON_CERTIFICATE_REQUEST = "SAVE_NAME_ON_CERTIFICATE_REQUEST";
export const SAVE_NAME_ON_CERTIFICATE_SUCCESS = "SAVE_NAME_ON_CERTIFICATE_SUCCESS";
export const SAVE_NAME_ON_CERTIFICATE_FAILURE = "SAVE_NAME_ON_CERTIFICATE_FAILURE";

export const fetchNameOnCertificate = createAction(FETCH_NAME_ON_CERTIFICATE_REQUEST, data => data);
export const fetchNameOnCertificateSuccess = createAction(FETCH_NAME_ON_CERTIFICATE_SUCCESS, data => data);
export const fetchNameOnCertificateFailure = createAction(FETCH_NAME_ON_CERTIFICATE_FAILURE, data => data);

export const saveNameOnCertificate = createAction(SAVE_NAME_ON_CERTIFICATE_REQUEST, data => data);
export const saveNameOnCertificateSuccess = createAction(SAVE_NAME_ON_CERTIFICATE_SUCCESS, data => data);
export const saveNameOnCertificateFailure = createAction(SAVE_NAME_ON_CERTIFICATE_FAILURE, data => data);
