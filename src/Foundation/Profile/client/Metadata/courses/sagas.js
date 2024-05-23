import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as api from "./api";

function* fetchCourses(request) {
  try {
    const data = yield call(api.getCourses,request.payload);
    yield put(actions.fetchCoursesSuccess(data));
  } catch (err) {
    yield put(actions.fetchCoursesFailure());
  }
}

function* watchFetchAllCoursesRequest() {
  yield takeLatest(actions.FETCH_COURSES_REQUEST, fetchCourses);
}

const coursesSagaWatchers = [
  watchFetchAllCoursesRequest,
];
export default coursesSagaWatchers;
