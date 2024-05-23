/* eslint-disable import/no-unresolved */
// import update from 'immutability-helper';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import * as actions from "./actions";

const initialState = {
  status: ApiStatus.Idle,
  entity: null,
};

const applicationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  // fetch apllication
  case actions.FETCH_APPLICATION_REQUEST:
  case actions.FETCH_OPEN_APPLICATION_REQUEST:
  case actions.FETCH_AUDIT_APPLICATION_REQUEST:
  case actions.FETCH_APPLICATION_WITH_APP_REQUIREMENTS_REQUEST:
  case actions.FETCH_APPLICATION_FLOW_REQUEST:
    return {
      ...initialState,
      status: ApiStatus.Fetching,
    };
  case actions.CLOSE_APPLICATION_SUCCESS:
    return {
      ...initialState,
      status: ApiStatus.Success,
    };
  case actions.FETCH_APPLICATION_SUCCESS:
  case actions.FETCH_OPEN_APPLICATION_SUCCESS:
  case actions.FETCH_AUDIT_APPLICATION_SUCCESS:
  case actions.FETCH_APPLICATION_FLOW_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.FETCH_APPLICATION_FAILURE:
  case actions.FETCH_OPEN_APPLICATION_FAILURE:
  case actions.FETCH_AUDIT_APPLICATION_FAILURE:
  case actions.FETCH_APPLICATION_FLOW_FAILURE:
  case actions.CLOSE_APPLICATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  // submit application
  case actions.SUBMIT_APPLICATION_REQUEST:
  case actions.SUBMIT_AUDIT_APPLICATION_REQUEST:
  case actions.CLOSE_APPLICATION_REQUEST:
    return {
      ...state,
      status: ApiStatus.Submitting,
    };
  case actions.SUBMIT_APPLICATION_SUCCESS:
    return {
      entity: action.payload,
      status: ApiStatus.Success,
    };
  case actions.SUBMIT_AUDIT_APPLICATION_SUCCESS:
    // Retaining the old audit document as its not available in the response
    const auditDocumentArray = state.entity.auditDocuments;
    const newEntity = action.payload;
    newEntity.auditDocuments = auditDocumentArray;
    return {
      entity: newEntity,
      status: ApiStatus.Success,
    };
  case actions.SUBMIT_APPLICATION_FAILURE:
  case actions.SUBMIT_AUDIT_APPLICATION_FAILURE:
    return {
      ...state,
      status: ApiStatus.Failure,
    };
  default:
    return state;
  }
};

export default applicationReducer;