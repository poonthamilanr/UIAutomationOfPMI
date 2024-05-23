import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import { getAccreditedUniversities } from "./accessors";
import * as actions from "./actions";
import * as api from "./api";

function* fetchAccreditedUniversities() {
  try {
    // Get accreditedUniversities from cache
    const state = yield select();
    let accreditedUniversities = getAccreditedUniversities(state);
    // Get accreditedUniversities from API, if not cached
    if (!accreditedUniversities) {
      // TODO: remove
      yield delay(1000)

      const data = yield call(api.fetchAccreditedUniversities);
      accreditedUniversities = data.resources;
    }
    yield put(actions.fetchAccreditedUniversitiesSuccess(accreditedUniversities));
  } catch (err) {
    yield put(actions.fetchAccreditedUniversitiesFailure());
  }
}

function* watchFetchAllAccreditedUniversitiesRequest() {
  yield takeLatest(actions.FETCH_ACCREDITED_UNIVERSITIES_REQUEST, fetchAccreditedUniversities);
}

const accreditedUniversitiesSagaWatchers = [
  watchFetchAllAccreditedUniversitiesRequest,
];
export default accreditedUniversitiesSagaWatchers;
