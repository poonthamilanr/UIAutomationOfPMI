import { createAction } from "redux-actions";

export const FETCH_APPLICATION_REQUEST = "FETCH_APPLICATION_REQUEST";
export const FETCH_APPLICATION_SUCCESS = "FETCH_APPLICATION_SUCCESS";
export const FETCH_APPLICATION_FAILURE = "FETCH_APPLICATION_FAILURE";
export const FETCH_APPLICATION_WITH_APP_REQUIREMENTS_REQUEST = "FETCH_APPLICATION_WITH_APP_REQUIREMENTS_REQUEST";
export const SUBMIT_APPLICATION_REQUEST = "SUBMIT_APPLICATION_REQUEST";
export const SUBMIT_APPLICATION_SUCCESS = "SUBMIT_APPLICATION_SUCCESS";
export const SUBMIT_APPLICATION_FAILURE = "SUBMIT_APPLICATION_FAILURE";
export const FETCH_OPEN_APPLICATION_REQUEST = "FETCH_OPEN_APPLICATION_REQUEST";
export const FETCH_OPEN_APPLICATION_SUCCESS = "FETCH_OPEN_APPLICATION_SUCCESS";
export const FETCH_OPEN_APPLICATION_FAILURE = "FETCH_OPEN_APPLICATION_FAILURE";
export const FETCH_AUDIT_APPLICATION_REQUEST = "FETCH_AUDIT_APPLICATION_REQUEST";
export const FETCH_AUDIT_APPLICATION_SUCCESS = "FETCH_AUDIT_APPLICATION_SUCCESS";
export const FETCH_AUDIT_APPLICATION_FAILURE = "FETCH_AUDIT_APPLICATION_FAILURE";
export const FETCH_APPLICATION_FLOW_REQUEST = "FETCH_APPLICATION_FLOW_REQUEST";
export const FETCH_APPLICATION_FLOW_SUCCESS = "FETCH_APPLICATION_FLOW_SUCCESS";
export const FETCH_APPLICATION_FLOW_FAILURE = "FETCH_APPLICATION_FLOW_FAILURE";
export const SUBMIT_AUDIT_APPLICATION_REQUEST = "SUBMIT_AUDIT_APPLICATION_REQUEST";
export const SUBMIT_AUDIT_APPLICATION_SUCCESS = "SUBMIT_AUDIT_APPLICATION_SUCCESS";
export const SUBMIT_AUDIT_APPLICATION_FAILURE = "SUBMIT_AUDIT_APPLICATION_FAILURE";
export const CLOSE_APPLICATION_REQUEST = "CLOSE_APPLICATION_REQUEST";
export const CLOSE_APPLICATION_SUCCESS = "CLOSE_APPLICATION_SUCCESS";
export const CLOSE_APPLICATION_FAILURE = "CLOSE_APPLICATION_FAILURE";

export const fetchApplication = createAction(FETCH_APPLICATION_REQUEST, data => data);
export const fetchApplicationSuccess = createAction(FETCH_APPLICATION_SUCCESS, data => data);
export const fetchApplicationFailure = createAction(FETCH_APPLICATION_FAILURE, data => data);
export const fetchApplicationWithAppRequirements = createAction(FETCH_APPLICATION_WITH_APP_REQUIREMENTS_REQUEST, data => data);

export const submitApplication = createAction(SUBMIT_APPLICATION_REQUEST, data => data);
export const submitApplicationSuccess = createAction(SUBMIT_APPLICATION_SUCCESS, data => data);
export const submitApplicationFailure = createAction(SUBMIT_APPLICATION_FAILURE, data => data);

export const fetchOpenApplication = createAction(FETCH_OPEN_APPLICATION_REQUEST, data => data);
export const fetchOpenApplicationSuccess = createAction(FETCH_OPEN_APPLICATION_SUCCESS, data => data);
export const fetchOpenApplicationFailure = createAction(FETCH_OPEN_APPLICATION_FAILURE, data => data);

export const fetchAuditApplication = createAction(FETCH_AUDIT_APPLICATION_REQUEST, data => data);
export const fetchAuditApplicationSuccess = createAction(FETCH_AUDIT_APPLICATION_SUCCESS, data => data);
export const fetchAuditApplicationFailure = createAction(FETCH_AUDIT_APPLICATION_FAILURE, data => data);

export const submitAuditApplication = createAction(SUBMIT_AUDIT_APPLICATION_REQUEST, data => data);
export const submitAuditApplicationSuccess = createAction(SUBMIT_AUDIT_APPLICATION_SUCCESS, data => data);
export const submitAuditApplicationFailure = createAction(SUBMIT_AUDIT_APPLICATION_FAILURE, data => data);

export const closeApplication = createAction(CLOSE_APPLICATION_REQUEST, data => data);
export const closeApplicationSuccess = createAction(CLOSE_APPLICATION_SUCCESS, data => data);
export const closeApplicationFailure = createAction(CLOSE_APPLICATION_FAILURE, data => data);