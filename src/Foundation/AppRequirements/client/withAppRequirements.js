import {
  call,
  put } from 'redux-saga/effects';
import * as actions from "./actions";

const withAppRequirements = callable => function* (action) {
  let result;
  yield put(actions.fetchAppRequirementsRequested())
  try {
    result = yield call(callable, action);
    yield put(actions.fetchAppRequirements());
  } catch {
    yield put(actions.FETCH_APPLICATION_REQUIREMENTS_FAILURE);
  }
  return result;
}

export default withAppRequirements;