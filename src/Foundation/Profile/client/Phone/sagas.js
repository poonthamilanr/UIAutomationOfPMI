import { call, put, takeLatest, select } from "redux-saga/effects";
import { getPhones } from 'foundation/Profile/client/Phone/accessors';
import { getProfilePhones, getProfilePhonesApi } from 'foundation/Profile/client/Profile/accessors';
import { FETCH_PROFILE_SUCCESS } from "../Profile/actions";
import * as actions from "./actions";
import * as api from "./api";


function* fetchPhones() {
  try {
    const state = yield select();
    let phones = getPhones(state) || getProfilePhones(state);

    if (!phones) {
      const data = yield call(api.fetchPhones, getProfilePhonesApi(state));
      phones = data && data.resources;
    }

    yield put(actions.fetchPhonesSuccess(phones));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchPhonesFailure());
  }
}

function* createPhone(action) {
  try {
    const state = yield select();
    const savedPhone = yield call(api.createPhone, {
      data: {...action.payload.data},
      url: getProfilePhonesApi(state),
    });

    if (savedPhone) {
      yield put(actions.createPhoneSuccess([...getPhones(state), savedPhone]));
      yield put(actions.setPrimaryPhone(savedPhone));
    } else {
      yield put(actions.createPhoneFailure(action.payload.data));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.createPhoneFailure(action.payload.data));
    if(err.response.status === 422)
    {
      action.payload.onFailure(action.payload.setErrors);
    }
  }
}

function* updatePhone(action) {
  try {
    const state = yield select();
    const link = action.payload.data._links.self;
    const savedPhone = yield call(api.updatePhone, {
      data: {...action.payload.data},
      url: link.href,
    });

    if (savedPhone) {
      const putchUpdated = phone => phone._links.self.href === link.href ? savedPhone : phone;
      yield put(actions.updatePhoneSuccess(getPhones(state).map(putchUpdated)));
      yield put(actions.setPrimaryPhone(savedPhone));
    } else {
      yield put(actions.updatePhoneFailure(action.payload.data));
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.updatePhoneFailure(action.payload.data));
    if(err.response.status === 422)
    {
      action.payload.onFailure(action.payload.setErrors);
    }
  }
}

function* setPrimaryPhone(action) {
  try {
    const primaryPhone = action.payload;
    const state = yield select();

    yield call(api.setPrimayPhone, {
      url: primaryPhone._links.primary.href,
    });

    const isPrimary = phone => phone._links.self.href === primaryPhone._links.self.href;
    const setPrimary = (phone, value) => phone.isPrimary === value ? phone : ({...phone, isPrimary: value});
    const updatePhone = phone => isPrimary(phone) ? setPrimary(phone, true) : setPrimary(phone, false);
    const phones = getPhones(state).map(updatePhone);
    yield put(actions.setPrimarySuccess(phones));

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    // yield put(actions.updatePhoneFailure(action.payload));
  }
}

function* watchFetchPhoneRequest() {
  yield takeLatest(FETCH_PROFILE_SUCCESS, fetchPhones);
}
function* watchCreatePhoneRequest() {
  yield takeLatest(actions.CREATE_PHONE_REQUEST, createPhone);
}
function* watchUpdatePhoneRequest() {
  yield takeLatest(actions.UPDATE_PHONE_REQUEST, updatePhone);
}
function* watchSetPrimaryPhoneRequest() {
  yield takeLatest(actions.SET_PRIMARY_PHONE_REQUEST, setPrimaryPhone);
}

const phoneSagaWatchers = [
  watchFetchPhoneRequest,
  watchCreatePhoneRequest,
  watchUpdatePhoneRequest,
  watchSetPrimaryPhoneRequest,
];
export default phoneSagaWatchers;
