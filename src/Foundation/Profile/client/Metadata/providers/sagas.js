import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchProviders(request) {
  try {
    const data = yield call(api.getProviders, request.payload);
    yield put(actions.fetchProvidersSuccess(data));
  } catch (err) {
    yield put(actions.fetchProvidersFailure());
  }
}

function* watchFetchAllProvidersRequest() {
  yield takeLatest(actions.FETCH_PROVIDERS_REQUEST, fetchProviders);
}

const providersSagaWatchers = [
  watchFetchAllProvidersRequest,
];
export default providersSagaWatchers;
