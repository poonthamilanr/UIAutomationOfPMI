import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import { getCountriesInfo, getFilteredCountries, getAllCountries } from "./accessors";
import * as actions from "./actions";
import * as api from "./api";

function* fetchAllCountries() {
  try {
    // Get countries from cache
    let countries = getAllCountries(getCountriesInfo(yield select()));
    // Get countries from API, if not cached
    if (!countries) {
      // TODO: remove
      yield delay(1000)

      const data = yield call(api.fetchCountries);
      countries = data.resources;
    }
    yield put(actions.fetchAllCountriesSuccess(countries));
  } catch (err) {
    yield put(actions.fetchAllCountriesFailure());
  }
}

function* fetchFilteredCountries() {
  try {
    // Get countries from cache
    let countries = getFilteredCountries(getCountriesInfo(yield select()));
    // Get countries from API, if not cached
    if (!countries) {
      // TODO: remove
      yield delay(1000)

      const data = yield call(api.fetchCountries, true);
      countries = data.resources;
    }
    yield put(actions.fetchFilteredCountriesSuccess( countries ));
  } catch (err) {
    yield put(actions.fetchFilteredCountriesFailure());
  }
}

function* fetchFilteredStates(request) {
  try {
    const data = yield call(api.fetchStateByCode, request.payload);
    yield put(actions.fetchFilteredStatesSuccess(data.resources));
  } catch (err) {
    yield put(actions.fetchFilteredStatesFailure());
  }
}

function* watchFetchAllCountriesRequest() {
  yield takeLatest(actions.FETCH_ALL_COUNTRIES_REQUEST, fetchAllCountries);
}
function* watchFetchFilteredCountriesRequest() {
  yield takeLatest(actions.FETCH_FILTERED_COUNTRIES_REQUEST, fetchFilteredCountries);
}
function* watchFetchFilteredStatesRequest() {
  yield takeLatest(actions.FETCH_FILTERED_STATES_REQUEST, fetchFilteredStates);
}

const countriesSagaWatchers = [
  watchFetchAllCountriesRequest,
  watchFetchFilteredCountriesRequest,
  watchFetchFilteredStatesRequest,
];
export default countriesSagaWatchers;
