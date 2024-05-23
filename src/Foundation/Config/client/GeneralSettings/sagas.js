import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchGeneralSettings() {
  try {
    const data = yield call(api.fetchGeneralSettings);
    yield put(actions.fetchGeneralSettingsSuccess(data));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchGeneralSettingsFailure());
  }
}

function* watchFetchGeneralSettingsRequest() {
  yield takeLatest(actions.FETCH_GENERAL_SETTINGS_REQUEST, fetchGeneralSettings);
}

const generalSettingsSagaWatchers = [ watchFetchGeneralSettingsRequest ];
export default generalSettingsSagaWatchers;
