import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchProfile() {
  try {
    const data = yield call(api.fetchProfile);
    yield put(actions.fetchProfileSuccess(data));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchProfileFailure());
  }
}

function* watchFetchProfileRequest() {
  yield takeLatest(actions.FETCH_PROFILE_REQUEST, fetchProfile);
}

const profileSagaWatchers = [ watchFetchProfileRequest ];
export default profileSagaWatchers;
