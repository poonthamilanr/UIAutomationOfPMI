import { call, put, takeLatest, select } from "redux-saga/effects";
import { getExamLocationDetailsApi, getExamAccommodationApi } from 'foundation/Application/client/Application/accessors';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import * as actions from "./actions";
import * as api from "./api";

function* saveExamLocation(action) {
  try {
    const state = yield select();
    const apiRequest = {
      data: {
        countryCode: action.payload,
      },
      url: getExamLocationDetailsApi(state),
    };
    if(getWorkflowType() === 'MCExam')
    {
      yield call(api.updateMcExamLocation, apiRequest);
    }
    else
    {
      yield call(api.updateExamLocation, apiRequest);
    }

    yield put(actions.saveExamLocationSuccess(action.payload));
  } catch (err) {
    yield put(actions.saveExamLocationFailure(err.response.data.detail));
  }
}

function* saveExamAccommodation(action) {
  try {
    const state = yield select();
    const apiRequest = {
      data: {
        accommodationRequested: action.payload,
      },
      url: getExamAccommodationApi(state),
    };
    if(getWorkflowType() === 'MCExam')
    {
      yield call(api.updateMcExamAccommodation, apiRequest);
    }
    else
    {
      yield call(api.updateExamAccommodation, apiRequest);
    }

    yield put(actions.saveExamAccommodationSuccess(action.payload));
  } catch (err) {
    yield put(actions.saveExamAccommodationFailure(err.response.data.detail));
  }
}

function* watchSaveExamLocationRequest() {
  yield takeLatest(actions.SAVE_EXAMLOCATION_REQUEST, saveExamLocation);
}

function* watchSaveExamAccommodationRequest() {
  yield takeLatest(actions.SAVE_EXAMACCOMMODATION_REQUEST, saveExamAccommodation);
}

const examLocationSagaWatchers = [
  watchSaveExamLocationRequest,
  watchSaveExamAccommodationRequest,
];

export default examLocationSagaWatchers;
