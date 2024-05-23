import { ApiStatus } from 'foundation/CertificationApiCore/client/constants';
import * as actions from './actions';

const replaceArrayElement = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

const getAuditDocumentIndexByLink = (link, list) =>
  list.findIndex(
    auditDocument => auditDocument._links && auditDocument._links.self.href.toLowerCase() === link.toLowerCase() // eslint-disable-line comma-dangle
  );

const deleteAuditDocumentFlag = (array, index) => {
  const ret = array.slice(0);
  ret[index].documentReceived = false;
  return ret;
};
const initialState = {
  status: ApiStatus.Idle,
  entity: [],
};

const auditDocumentReducer = (state = initialState, action = {}) => {
  /* eslint-disable indent */
  switch (action.type) {
    case actions.FETCH_AUDIT_DOCUMENT_REQUEST:
      return {
        ...initialState,
        status: ApiStatus.Fetching,
      };
    case actions.FETCH_AUDIT_DOCUMENT_SUCCESS:
      return {
        entity: action.payload,
        status: ApiStatus.Success,
      };
    case actions.FETCH_AUDIT_DOCUMENT_FAILURE:
      return {
        ...state,
        status: ApiStatus.Failure,
      };
    case actions.UPLOAD_AUDIT_DOCUMENT_REQUEST:
    case actions.DELETE_AUDIT_DOCUMENT_REQUEST:
    case actions.DOWNLOAD_AUDIT_DOCUMENT_REQUEST:
      return {
        ...state,
        status: ApiStatus.Submitting,
      };
    case actions.UPLOAD_AUDIT_DOCUMENT_FAILURE:
    case actions.DOWNLOAD_AUDIT_DOCUMENT_FAILURE:
      return {
        ...state,
        status: ApiStatus.Failure,
      };
    case actions.UPLOAD_AUDIT_DOCUMENT_SUCCESS:
    case actions.DOWNLOAD_AUDIT_DOCUMENT_SUCCESS:
      let index = getAuditDocumentIndexByLink(action.payload._links['self'].href, state.entity);
      if (index < 0) {
        index = state.entity.length;
      }
      return {
        entity: replaceArrayElement(state.entity, index, action.payload),
        status: ApiStatus.Success,
      };
    case actions.DELETE_AUDIT_DOCUMENT_SUCCESS:
      let deleteIndex = getAuditDocumentIndexByLink(action.payload._links['self'].href, state.entity);
      if (deleteIndex < 0) {
        deleteIndex = state.entity.length;
      }
      return {
        entity: deleteAuditDocumentFlag(state.entity, deleteIndex),
        status: ApiStatus.Success,
      };
    case actions.POST_AUDIT_REFERENCE_REQUEST:
    case actions.DOWNLOAD_AUDIT_REFERENCE_REQUEST:
      return {
        ...state,
        status: ApiStatus.Submitting,
      };
    case actions.POST_AUDIT_REFERENCE_FAILURE:
    case actions.DOWNLOAD_AUDIT_REFERENCE_FAILURE:
      return {
        ...state,
        status: ApiStatus.Failure,
      };
    case actions.POST_AUDIT_REFERENCE_SUCCESS:
      let docIndex = getAuditDocumentIndexByLink(action.payload._links['self'].href, state.entity);
      if (docIndex < 0) {
        docIndex = state.entity.length;
      }
      return {
        entity: replaceArrayElement(state.entity, docIndex, action.payload),
        status: ApiStatus.Success,
      };
    case actions.DOWNLOAD_AUDIT_REFERENCE_SUCCESS:
      return {
        ...state,
        status: ApiStatus.Success,
      };
    default:
      return state;
  }
  /* eslint-enable indent */
};

export default auditDocumentReducer;
