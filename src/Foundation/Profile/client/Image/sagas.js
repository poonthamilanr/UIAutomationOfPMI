import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchProfileImageUrlImageUrl() {
  try {
    const data = yield call(api.fetchProfileImageUrl);
    yield put(actions.fetchProfileImageUrlSuccess(data));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchProfileImageUrlFailure());
  }
}

function* watchFetchProfileImageUrlRequest() {
  yield takeLatest(actions.FETCH_PROFILE_IMAGE_URL_REQUEST, fetchProfileImageUrlImageUrl);
}

const profileImageUrlSagaWatchers = [ watchFetchProfileImageUrlRequest ];
export default profileImageUrlSagaWatchers;
