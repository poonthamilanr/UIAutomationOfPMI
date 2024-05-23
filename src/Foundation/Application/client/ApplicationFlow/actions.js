import { createAction } from "redux-actions";

export const FETCH_APPLICATION_FLOW_REQUEST = "FETCH_APPLICATION_FLOW_REQUEST";
export const FETCH_APPLICATION_FLOW_SUCCESS = "FETCH_APPLICATION_FLOW_SUCCESS";
export const FETCH_APPLICATION_FLOW_FAILURE = "FETCH_APPLICATION_FLOW_FAILURE";

export const fetchApplicationFlow = createAction(FETCH_APPLICATION_FLOW_REQUEST, data => data);
export const fetchApplicationFlowSuccess = createAction(FETCH_APPLICATION_FLOW_SUCCESS, data => data);
export const fetchApplicationFlowFailure = createAction(FETCH_APPLICATION_FLOW_FAILURE, data => data);