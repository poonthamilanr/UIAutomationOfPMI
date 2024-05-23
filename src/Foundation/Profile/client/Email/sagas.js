import { call, put, takeLatest, select } from "redux-saga/effects";
import { getEmail, getSpecEmailApi } from 'foundation/Profile/client/Email/accessors';
import { getProfileEmail, getEmailsApi } from 'foundation/Profile/client/Profile/accessors';
import { FETCH_PROFILE_SUCCESS } from "../Profile/actions";
import * as actions from "./actions";
import * as api from "./api";

function* fetchEmail() {
  try {
    const state = yield select();
    let email = getEmail(state);
    if (!email) {
      email = getProfileEmail(state);
    }
    yield put(actions.fetchEmailSuccess(email));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchEmailFailure());
  }
}

function* updateEmail(action) {
  try {
    const state = yield select();
    const savedEmail = yield call(api.updateEmail, {
      data: {
        ...getEmail(state),
        isPrimary: true,
        address: action.payload.address,
      },
      url: getSpecEmailApi(state),
    });
    if (savedEmail) {
      yield put(actions.updateEmailSuccess(savedEmail));
    } else {
      yield put(actions.updateEmailFailure(action.payload));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.updateEmailFailure(action.payload));
    if(err.response.status === 422)
    {
      action.payload.onFailure(action.payload.setErrors);
    }
  }
}

function* createEmail(action) {
  try {
    const state = yield select();
    const savedEmail = yield call(api.createEmail, {
      data: {
        isPrimary: true,
        address: action.payload.address,
      },
      url: getEmailsApi(state),
    });

    if (savedEmail) {
      yield put(actions.createEmailSuccess(savedEmail));
    } else {
      yield put(actions.createEmailFailure(action.payload));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.createEmailFailure(action.payload));
    if(err.response.status === 422)
    {
      action.payload.onFailure(action.payload.setErrors);
    }
  }
}

function* watchFetchEmailRequest() {
  // yield takeLatest(actions.FETCH_EMAIL_REQUEST, fetchEmail);
  yield takeLatest(FETCH_PROFILE_SUCCESS, fetchEmail);
}
function* watchUpdateEmailRequest() {
  yield takeLatest(actions.UPDATE_EMAIL_REQUEST, updateEmail);
}
function* watchCreateEmailRequest() {
  yield takeLatest(actions.CREATE_EMAIL_REQUEST, createEmail);
}

const emailSagaWatchers = [
  watchFetchEmailRequest,
  watchUpdateEmailRequest,
  watchCreateEmailRequest,
];
export default emailSagaWatchers;