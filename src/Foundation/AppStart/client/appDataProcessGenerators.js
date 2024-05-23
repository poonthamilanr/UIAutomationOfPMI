import { call, put } from "redux-saga/effects";
import * as applicationApi from "foundation/Application/client/Application/api";
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as examActions from "foundation/Application/client/Exam/actions";

export const launchApplicationAppDataProcessingGenerator = function* (payload) {
  const { certType, studentBundle } = payload;
  const appInfo = yield call(applicationApi.fetchActiveWithCreate, certType, studentBundle);
  yield put(applicationActions.fetchApplicationSuccess(appInfo));
};

export const launchOpenAppDataProcessingGenerator = function* (payload) {
  yield put(applicationActions.fetchOpenApplication(payload));
};

export const launchAuditAppDataProcessingGenerator = function* (payload) {
  yield put(applicationActions.fetchAuditApplication(payload));
};

export const launchExamDataProcessingGenerator = function* (payload) {
  yield put(examActions.fetchExams(payload));
};
