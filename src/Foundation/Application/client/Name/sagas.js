import {
  call,
  put,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects";
import { getNameOnIdentification } from 'foundation/Application/client/Name/accessors';
import {
  getNameOnIdentification as getAppNameOnIdentification,
  getNameOnIdentificationApi,
} from 'foundation/Application/client/Application/accessors';
import * as actions from "./actions";
import { FETCH_APPLICATION_SUCCESS, FETCH_OPEN_APPLICATION_SUCCESS } from "../Application/actions";
import * as api from "./api";

function* fetchNameOnIdentification() {
  try {
    const state = yield select();
    const nameUrl = getNameOnIdentificationApi(state);
    let name = getNameOnIdentification(state) || getAppNameOnIdentification(state);

    if (!name && nameUrl) {
      // TODO: remove
      yield delay(1000);

      // Get name from API
      name = yield call(api.fetchNameOnIdentification, nameUrl);
    }

    yield put(actions.fetchNameOnIdentificationSuccess(name));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchNameOnIdentificationFailure());
  }
}

function* saveNameOnIdentification(action) {
  try {
    const state = yield select();
    const savedName = yield call(api.saveNameOnIdentification, {
      data: {
        ...getNameOnIdentification(state),
        ...action.payload,
      },
      url: getNameOnIdentificationApi(state),
    });

    if (savedName) {
      yield put(actions.saveNameOnIdentificationSuccess(action.payload));
    } else {
      yield put(actions.saveNameOnIdentificationFailure(action.payload));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveNameOnIdentificationFailure(action.payload));
  }
}

function* watchFetchNameOnIdentificationRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchNameOnIdentification);
  yield takeLatest(FETCH_OPEN_APPLICATION_SUCCESS, fetchNameOnIdentification);
}

function* watchSaveNameOnIdentificationRequest() {
  yield takeLatest(actions.SAVE_NAME_ON_IDENTIFICATION_REQUEST, saveNameOnIdentification);
}

const nameSagaWatchers = [
  watchFetchNameOnIdentificationRequest,
  watchSaveNameOnIdentificationRequest,
];

export default nameSagaWatchers;
