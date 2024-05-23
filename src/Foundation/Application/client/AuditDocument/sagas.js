import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getAuditDocumentInfo } from 'foundation/Application/client/Application/accessors';
import { FETCH_AUDIT_APPLICATION_SUCCESS } from '../Application/actions';
import * as actions from './actions';
import * as api from './api';

function* fetchAuditDocument() {
  try {
    const state = yield select();
    const auditDocuments = getAuditDocumentInfo(state);
    yield put(actions.fetchAuditDocumentSuccess(auditDocuments));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchAuditDocumentFailure());
  }
}

const uploadAuditDocument = function*(action) {
  try {
    const { _links, onSuccess, ...data } = { ...action.payload };
    const updatedAudit = yield call(api.uploadAuditDocument, {
      data,
      url: _links['AuditDocument'].href,
    });
    yield put(actions.uploadAuditDocumentSuccess(updatedAudit));
    if (onSuccess !== undefined) {
      onSuccess();
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.uploadAuditDocumentFailure(action.payload));
  }
};

const downloadAuditDocument = function*(action) {
  try {
    const audiDocument = action.payload.audiDocument;
    audiDocument['url'] = yield call(api.getAuditDocument, { url: action.payload._links['AuditDocument'].href });
    const tmplink = document.createElement('a');
    tmplink.href = audiDocument['url'];
    tmplink.setAttribute('download', action.payload.fileName);
    document.body.appendChild(tmplink);
    tmplink.click();
    tmplink.remove();
    yield put(actions.downloadAuditDocumentSuccess(audiDocument));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.downloadAuditDocumentFailure(action.payload));
  }
};

const deleteAuditDocument = function*(action) {
  try {
    const { _links } = { ...action.payload };
    yield call(api.deleteAuditDocument, { url: _links['self'].href });
    yield put(actions.deleteAuditDocumentSuccess(action.payload));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.deleteAuditDocumentFailure(action.payload));
  }
};

const postAuditReference = function*(action) {
  try {
    const { onSuccess, ...data } = { ...action.payload };
    const updatedAudit = yield call(api.postAuditReference, { data });
    yield put(actions.postAuditReferenceSuccess(updatedAudit));
    if (onSuccess !== undefined) {
      onSuccess();
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.postAuditReferenceFailure(action.payload));
  }
};

const downloadAuditReference = function*(action) {
  try {
    const { onSuccess, applicationId, auditDocumentId, referenceExperienceId } = action.payload;
    const result = yield call(api.getReferenceDocument, { applicationId, auditDocumentId });
    yield put(actions.downloadAuditReferenceSuccess(action.payload));
    if (onSuccess !== undefined) {
      onSuccess(result, referenceExperienceId);
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.downloadAuditReferenceFailure(action.payload));
  }
};

function* watchFetchAuditDocumentRequest() {
  yield takeLatest(FETCH_AUDIT_APPLICATION_SUCCESS, fetchAuditDocument);
  yield takeLatest(actions.FETCH_AUDIT_DOCUMENT_REQUEST, fetchAuditDocument);
}

function* watchUploadAuditDocumentRequest() {
  yield takeLatest(actions.UPLOAD_AUDIT_DOCUMENT_REQUEST, uploadAuditDocument);
}

function* watchDeleteAuditDocumentRequest() {
  yield takeLatest(actions.DELETE_AUDIT_DOCUMENT_REQUEST, deleteAuditDocument);
}

function* watchDownloadAuditDocumentRequest() {
  yield takeLatest(actions.DOWNLOAD_AUDIT_DOCUMENT_REQUEST, downloadAuditDocument);
}

function* watchPostAuditReferenceRequest() {
  yield takeLatest(actions.POST_AUDIT_REFERENCE_REQUEST, postAuditReference);
}

function* watchDownloadReferenceDocumentRequest() {
  yield takeLatest(actions.DOWNLOAD_AUDIT_REFERENCE_REQUEST, downloadAuditReference);
}

const auditDocumentSagaWatchers = [
  watchFetchAuditDocumentRequest,
  watchUploadAuditDocumentRequest,
  watchDeleteAuditDocumentRequest,
  watchPostAuditReferenceRequest,
  watchDownloadAuditDocumentRequest,
  watchDownloadReferenceDocumentRequest,
];

export default auditDocumentSagaWatchers;
