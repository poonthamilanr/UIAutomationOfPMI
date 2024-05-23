import {
  call,
  put,
  takeLatest,
  select,
} from "redux-saga/effects";
import { getExams, getMcExamApi } from 'foundation/Application/client/Exam/accessors';
import { getWorkflowType, getCertType } from 'foundation/Application/client/certtype-storage';
import { getExams as getAppExams, getExamsApi } from 'foundation/Application/client/Application/accessors';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import * as actions from "./actions";
import * as api from "./api";


function* fetchExams() {
  try {
    const state = yield select();

    let exams = getExams(state) || getAppExams(state);
    if (!exams) {
      if(getWorkflowType() === 'MCExam')
      {
        const certType = getCertType();
        exams = yield call(api.fetchActiveExam, certType);
      }
      else
      {
        const data = yield call(api.fetchExams, getExamsApi(state));
        exams = data && data.resources;
      }
    }

    yield put(actions.fetchExamsSuccess(exams));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchExamsFailure());
  }
}

function* submitExamDetail() {

  try {
    const state = yield select();
    const { appRedirects } = getSitecoreContext();
    const redirectUrls = appRedirects.redirectLinks;
    const examApiUrl = getMcExamApi(state);
    const data = yield call(api.submitExamDetail, examApiUrl);
    yield put(actions.submitExamDetailSuccess(data));
    window.location.href = `${redirectUrls.MyPmiMCDashboard}`;
  } catch (err) {
    const data = err.response && err.response.data;
    console.log('Submit Exam details error:', data || err); // eslint-disable-line no-console
    yield put(actions.submitExamDetailFailure());
  }
}

function* watchFetchExamRequest() {
  yield takeLatest(actions.FETCH_EXAMS_REQUEST, fetchExams);
}

function* watchExamDetailRequest() {
  yield takeLatest(actions.SUBMIT_EXAM_DETAIL_REQUEST, submitExamDetail);
}

const examSagaWatchers = [
  watchFetchExamRequest, watchExamDetailRequest,
];
export default examSagaWatchers;
