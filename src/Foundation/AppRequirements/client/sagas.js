import { call, put, takeLatest, select } from "redux-saga/effects";
import { getExperience } from 'foundation/Application/client/Experience/accessors';
import { getApplicationApi } from 'foundation/Application/client/Application/accessors';
import { patchExperienceRequirements } from './utils';
import * as actions from "./actions";
import * as api from "./api";

function* fetchAppRequirements() {
  try {
    const state = yield select();
    const appApiUrl = getApplicationApi(state);
    if (appApiUrl) {
      const requierments = yield call(api.fetchAppRequirements, appApiUrl);

      // requirements-status api response have to be updated with UI validation for experienceRequirements
      const experiences = getExperience(state);
      const patchedRequierments = {
        ...requierments,
        experienceRequirements: patchExperienceRequirements(requierments.experienceRequirements, experiences),
      }

      yield put(actions.fetchAppRequirementsSuccess(patchedRequierments));
    } else {
      yield put(actions.fetchAppRequirementsFailure());
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchAppRequirementsFailure());
  }
}

function* watchFetchAppRequirementsRequest() {
  yield takeLatest(actions.FETCH_APPLICATION_REQUIREMENTS_REQUEST, fetchAppRequirements);
}

const appRequirementsSagaWatchers = [watchFetchAppRequirementsRequest];

export default appRequirementsSagaWatchers;
