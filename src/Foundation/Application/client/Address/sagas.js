import { call, put, takeLatest, select } from "redux-saga/effects";
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import * as actions from "./actions";
import { getIdentificationAddress } from './accessors';
import { getExamIdentificationAddress, getExamIdentificationAddressApi } from '../Application/accessors';
import { FETCH_APPLICATION_SUCCESS, FETCH_OPEN_APPLICATION_SUCCESS } from "../Application/actions";
import { FETCH_EXAMS_SUCCESS } from "../Exam/actions";
import * as api from "./api";

function* fetchAddress() {
  try {
    const state = yield select();
    const address = getIdentificationAddress(state) || getExamIdentificationAddress(state);
    yield put(actions.fetchAddressSuccess(address));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchAddressFailure());
  }
}

function* saveAddress(action) {
  try {
    const state = yield select();

    const updateAddressUrl = getExamIdentificationAddressApi(state);
    const request = {
      url: updateAddressUrl,
      data: action.payload,
    };
    let data;

    if(getWorkflowType() === 'MCExam')
    {
      data = yield call(api.updateMcExamAddress, request);
    }
    else
    {
      data = yield call(api.updateAddress, request);
    }

    if (data) {
      yield put(actions.saveAddressSuccess(data));
    } else {
      yield put(actions.saveAddressFailure())
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveAddressFailure(action.payload));
  }
}

function* watchFetchAddressRequest() {
  yield takeLatest(FETCH_APPLICATION_SUCCESS, fetchAddress);
  yield takeLatest(FETCH_OPEN_APPLICATION_SUCCESS, fetchAddress);
  yield takeLatest(FETCH_EXAMS_SUCCESS, fetchAddress);
}
function* watchSaveAddressRequest() {
  yield takeLatest(actions.SAVE_ADDRESS_REQUEST, saveAddress);
}


const addressSagaWatchers = [
  watchFetchAddressRequest,
  watchSaveAddressRequest,
];

export default addressSagaWatchers;
