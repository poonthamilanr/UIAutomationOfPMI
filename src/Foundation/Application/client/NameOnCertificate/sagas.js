import {
  call,
  put,
  takeLatest,
  select,
} from "redux-saga/effects";
import { getNameOnIdentification } from 'foundation/Application/client/Name/accessors';
import { getNameOnCertificate } from 'foundation/Application/client/NameOnCertificate/accessors';
import {
  getNameOnIdentification as getAppNameOnIdentification,
  getNameOnCertificate as getAppNameOnCertificate,
  getNameOnCertificateApi,
} from 'foundation/Application/client/Application/accessors';
import * as actions from "./actions";
import { FETCH_APPLICATION_SUCCESS, FETCH_OPEN_APPLICATION_SUCCESS } from "../Application/actions";
import * as api from "./api";

function* fetchNameOnCertificate() {
  try {
    const state = yield select();
    const fullName = getNameOnIdentification(state) || getAppNameOnIdentification(state);
    const names = fullName ? [fullName.firstName, fullName.middleName, fullName.lastName] : [];
    const combinedName = names.join(' ').trim();
    const name = getNameOnCertificate(state) || getAppNameOnCertificate(state) || combinedName;

    yield put(actions.fetchNameOnCertificateSuccess(name));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchNameOnCertificateFailure());
  }
}

function* saveNameOnCertificate(action) {
  try {
    const state = yield select();
    const savedNameOnCertificate = yield call(api.saveNameOnCertificate, {
      data: {
        name: action.payload,
      },
      url: getNameOnCertificateApi(state),
    });

    if (savedNameOnCertificate) {
      yield put(actions.saveNameOnCertificateSuccess(action.payload));
    } else {
      yield put(actions.saveNameOnCertificateFailure(action.payload));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveNameOnCertificateFailure(action.payload));
  }
}

function* watchFetchNameOnCertificateRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchNameOnCertificate);
  yield takeLatest(FETCH_OPEN_APPLICATION_SUCCESS, fetchNameOnCertificate);
}

function* watchSaveNameOnCertificateRequest() {
  yield takeLatest(actions.SAVE_NAME_ON_CERTIFICATE_REQUEST, saveNameOnCertificate);
}

const nameSagaWatchers = [
  watchFetchNameOnCertificateRequest,
  watchSaveNameOnCertificateRequest,
];

export default nameSagaWatchers;
