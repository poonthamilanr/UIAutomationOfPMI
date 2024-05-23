import { put, takeLatest, select, call } from "redux-saga/effects";
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import withAppRequirements from "foundation/AppRequirements/client/withAppRequirements";
import { getCertType } from "foundation/Application/client/certtype-storage";
import { getOpenExperienceSummariesApi } from 'foundation/Application/client/Application/accessors';
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getExperienceSummariesApi } from "./accessors";
import * as appActions from "../Application/actions";
import * as actions from "./actions";
import * as api from "./api";

function* fetchOpenExperienceSummaries() {
  try {
    const state = yield select();
    let questions = [];
    let answers = [];
    const openExperienceSummariesApi = getOpenExperienceSummariesApi(state);
    const certType = getCertType();

    if (openExperienceSummariesApi && (certType === 'PgMP' || certType === 'PfMP') || isPageSimulation()) {
      const openExperienceSummaries = yield call(api.fetchOpenExperienceSummaries, openExperienceSummariesApi);
      yield put(actions.setExperienceSummariesApiUrl(openExperienceSummaries._links.self.href));
      answers = openExperienceSummaries._embedded.answers.resources;

      const experienceSummariesQuestionsApi = `${openExperienceSummaries._links.self.href}/questions`;

      if (experienceSummariesQuestionsApi) {
        const questionsResponse = yield call(api.fetchExperienceSummariesQuestions, experienceSummariesQuestionsApi);
        questions = (questionsResponse && questionsResponse.resources) || [];
      }
    }

    const lastAnswer = href => (res, answer) => {
      return href.toLowerCase() === answer._links.self.href.toLowerCase() ? answer : res;
    };

    const result = questions.map(question => ({
      ...question,
      answer: answers.reduce(lastAnswer(question._links.answer.href), null),
    }));

    yield put(actions.fetchOpenExperienceSummariesSuccess(result));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchOpenExperienceSummariesFailure());
  }
}

const saveExperienceAnswer = function* (action, answerUpdated) {
  try {
    const { answer, onSuccess, ...question } = action.payload;

    if (answerUpdated === undefined) {
      const response = yield call(api.updateExperienceSummariesAnswer, {
        url: question._links.answer.href,
        data: {
          ...answer,
          updated: true,
        },
      });

      yield put(actions.saveExperienceSummariesAnswerSuccess({ ...response, questionLink: question._links.self.href }));
    } else {
      const response = yield call(api.updateExperienceSummariesAnswer, {
        url: question._links.answer.href,
        data: answer,
      });

      yield put(actions.saveExperienceSummariesAnswerSuccess(response));
    }
    if (onSuccess !== undefined) {
      onSuccess();
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveExperienceSummariesAnswerFailure(action.payload));
  }
};

const saveExperienceAnswerWithAppRequirements = withAppRequirements((action) => saveExperienceAnswer(action, true));

const submitExperienceSummaries = function* (action) {
  const { history } = action.payload;
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;

  try {
    yield put(loaderActions.showPageLoader());
    const state = yield select();

    const apiUrl = `${getExperienceSummariesApi(state)}/submit`;
    const data = yield call(api.submitExperienceSummaries, apiUrl);
    yield put(actions.submitExperienceSummariesSuccess(data));

    window.location.href = redirectUrls.SubmittedEditSummaries;
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.submitExperienceSummariesFailure());
    yield call(history.push, `${redirectUrls.Sorry}?errorcode=SubmitFailed`);
  } finally {
    yield put(loaderActions.hidePageLoader());
  }
};

function* watchFetchOpenExperienceSummariesRequest() {
  yield takeLatest(appActions.FETCH_OPEN_APPLICATION_SUCCESS, fetchOpenExperienceSummaries);
  yield takeLatest(appActions.FETCH_APPLICATION_SUCCESS, fetchOpenExperienceSummaries);
}

function* watchSaveExperienceAnswerRequest() {
  yield takeLatest(actions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_REQUEST, saveExperienceAnswer);
  yield takeLatest(actions.SAVE_EXPERIENCE_SUMMARIES_ANSWER_WITH_APP_REQUIREMENTS_REQUEST, saveExperienceAnswerWithAppRequirements);
}

function* watchSubmitExperienceSummariesRequest() {
  yield takeLatest(actions.SUBMIT_EXPERIENCE_SUMMARIES_REQUEST, submitExperienceSummaries);
}

const experienceSummariesSagaWatchers = [
  watchFetchOpenExperienceSummariesRequest,
  watchSaveExperienceAnswerRequest,
  watchSubmitExperienceSummariesRequest,
];

export default experienceSummariesSagaWatchers;
