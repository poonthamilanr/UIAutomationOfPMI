import { createAction } from 'redux-actions';

export const FETCH_AUDIT_DOCUMENT_REQUEST = 'FETCH_AUDIT_DOCUMENT_REQUEST';
export const FETCH_AUDIT_DOCUMENT_SUCCESS = 'FETCH_AUDIT_DOCUMENT_SUCCESS';
export const FETCH_AUDIT_DOCUMENT_FAILURE = 'FETCH_AUDIT_DOCUMENT_FAILURE';
export const UPLOAD_AUDIT_DOCUMENT_REQUEST = 'UPLOAD_AUDIT_DOCUMENT_REQUEST';
export const UPLOAD_AUDIT_DOCUMENT_SUCCESS = 'UPLOAD_AUDIT_DOCUMENT_SUCCESS';
export const UPLOAD_AUDIT_DOCUMENT_FAILURE = 'UPLOAD_AUDIT_DOCUMENT_FAILURE';
export const DELETE_AUDIT_DOCUMENT_REQUEST = 'DELETE_AUDIT_DOCUMENT_REQUEST';
export const DELETE_AUDIT_DOCUMENT_SUCCESS = 'DELETE_AUDIT_DOCUMENT_SUCCESS';
export const DELETE_AUDIT_DOCUMENT_FAILURE = 'DELETE_AUDIT_DOCUMENT_FAILURE';
export const POST_AUDIT_REFERENCE_REQUEST = 'POST_AUDIT_REFERENCE_REQUEST';
export const POST_AUDIT_REFERENCE_SUCCESS = 'POST_AUDIT_REFERENCE_SUCCESS';
export const POST_AUDIT_REFERENCE_FAILURE = 'POST_AUDIT_REFERENCE_FAILURE';
export const DOWNLOAD_AUDIT_DOCUMENT_REQUEST = 'DOWNLOAD_AUDIT_DOCUMENT_REQUEST';
export const DOWNLOAD_AUDIT_DOCUMENT_SUCCESS = 'DOWNLOAD_AUDIT_DOCUMENT_SUCCESS';
export const DOWNLOAD_AUDIT_DOCUMENT_FAILURE = 'DOWNLOAD_AUDIT_DOCUMENT_FAILURE';
export const DOWNLOAD_AUDIT_REFERENCE_REQUEST = 'DOWNLOAD_AUDIT_REFERENCE_REQUEST';
export const DOWNLOAD_AUDIT_REFERENCE_SUCCESS = 'DOWNLOAD_AUDIT_REFERENCE_SUCCESS';
export const DOWNLOAD_AUDIT_REFERENCE_FAILURE = 'DOWNLOAD_AUDIT_REFERENCE_FAILURE';

export const fetchAuditDocument = createAction(FETCH_AUDIT_DOCUMENT_REQUEST, data => data);
export const fetchAuditDocumentSuccess = createAction(FETCH_AUDIT_DOCUMENT_SUCCESS, data => data);
export const fetchAuditDocumentFailure = createAction(FETCH_AUDIT_DOCUMENT_FAILURE, data => data);

export const uploadAuditDocument = createAction(UPLOAD_AUDIT_DOCUMENT_REQUEST, data => data);
export const uploadAuditDocumentSuccess = createAction(UPLOAD_AUDIT_DOCUMENT_SUCCESS, data => data);
export const uploadAuditDocumentFailure = createAction(UPLOAD_AUDIT_DOCUMENT_FAILURE, data => data);

export const deleteAuditDocument = createAction(DELETE_AUDIT_DOCUMENT_REQUEST, data => data);
export const deleteAuditDocumentSuccess = createAction(DELETE_AUDIT_DOCUMENT_SUCCESS, data => data);
export const deleteAuditDocumentFailure = createAction(DELETE_AUDIT_DOCUMENT_FAILURE, data => data);

export const postAuditReferenceRequest = createAction(POST_AUDIT_REFERENCE_REQUEST, data => data);
export const postAuditReferenceSuccess = createAction(POST_AUDIT_REFERENCE_SUCCESS, data => data);
export const postAuditReferenceFailure = createAction(POST_AUDIT_REFERENCE_FAILURE, data => data);

export const downloadAuditDocument = createAction(DOWNLOAD_AUDIT_DOCUMENT_REQUEST, data => data);
export const downloadAuditDocumentSuccess = createAction(DOWNLOAD_AUDIT_DOCUMENT_SUCCESS, data => data);
export const downloadAuditDocumentFailure = createAction(DOWNLOAD_AUDIT_DOCUMENT_FAILURE, data => data);

export const downloadAuditReference = createAction(DOWNLOAD_AUDIT_REFERENCE_REQUEST, data => data);
export const downloadAuditReferenceSuccess = createAction(DOWNLOAD_AUDIT_REFERENCE_SUCCESS, data => data);
export const downloadAuditReferenceFailure = createAction(DOWNLOAD_AUDIT_REFERENCE_FAILURE, data => data);
