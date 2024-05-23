import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchNavigation() {
  try {
    const data = yield call(api.fetchNavigation);
    yield put(actions.fetchNavigationSuccess(data));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchNavigationFailure());
  }
}

function* watchFetchNavigationRequest() {
  yield takeLatest(actions.FETCH_NAVIGATION_REQUEST, fetchNavigation);
}

const navigationSagaWatchers = [ watchFetchNavigationRequest ];
export default navigationSagaWatchers;