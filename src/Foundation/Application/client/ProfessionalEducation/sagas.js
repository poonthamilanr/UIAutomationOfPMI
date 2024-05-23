import { call, put, takeLatest, select} from "redux-saga/effects";
import { getProfEducationResources, getProfEducationApi } from 'foundation/Application/client/Application/accessors';
import withAppRequirements from 'foundation/AppRequirements/client/withAppRequirements';
import { getProfessionalEducation } from './accessors';
import { FETCH_APPLICATION_SUCCESS } from "../Application/actions";
import * as actions from "./actions";
import * as api from "./api";

function* fetchProfessionalEducation() {
  try {
    const state = yield select();
    let profEducation = getProfessionalEducation(state);
    profEducation = profEducation.length ? profEducation : getProfEducationResources(state);

    yield put(actions.fetchProfessionalEducationSuccess(profEducation));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchProfessionalEducationFailure());
  }
}

const saveProfessionalEducation = withAppRequirements(function* (action) {
  try {
    const state = yield select();
    const { _links, applicationId, ...data } = { ...action.payload }; // removing applicationId from data

    let savedEducation;
    if (_links) {
      savedEducation = yield call(api.updateProfessionalEducation, {
        data,
        url: _links.self.href,
      });
    } else {
      savedEducation = yield call(api.createProfessionalEducation, {
        data,
        url: getProfEducationApi(state),
      });
    }
    yield put(actions.saveProfessionalEducationSuccess(savedEducation));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveProfessionalEducationFailure(action.payload));
  }
});

const deleteProfessionalEducation = withAppRequirements(function* (action) {
  try {
    yield call(api.deleteProfessionalEducation, { url: action.payload });
    yield put(actions.deleteProfessionalEducationSuccess(action.payload));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.deleteProfessionalEducationFailure(action.payload));
  }
});

function* watchFetchProfessionalEducationRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchProfessionalEducation);
}

function* watchSaveProfessionalEducationRequest() {
  yield takeLatest(actions.SAVE_PROFESSIONAL_EDUCATION_REQUEST, saveProfessionalEducation);
}

function* watchDeleteProfessionalEducationRequest() {
  yield takeLatest(actions.DELETE_PROFESSIONAL_EDUCATION_REQUEST, deleteProfessionalEducation);
}

const professionalEducationSagaWatchers = [
  watchFetchProfessionalEducationRequest,
  watchSaveProfessionalEducationRequest,
  watchDeleteProfessionalEducationRequest,
];

export default professionalEducationSagaWatchers;
