import { call, put, takeLatest, select } from "redux-saga/effects";
import { getProfileAddressPreferences, getAddressPreferredApi } from '../Profile/accessors';
import { FETCH_PROFILE_SUCCESS } from "../Profile/actions";
import { getAddresses } from './accessors';
import * as actions from "./actions";
import * as api from "./api";

function* fetchAddresses() {
  try {
    const state = yield select();
    const addresses = getAddresses(state) || getProfileAddressPreferences(state);

    yield put(actions.fetchAddressesSuccess(addresses));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchAddressesFailure());
  }
}

function* saveAddress(action) {
  try {
    const state = yield select();
    const { profileAddress, values } = action.payload;
    let data;
    let updatedAddresses = getAddresses(state).map(address => address);

    if (profileAddress) {
      const updateProfileAddressLink = profileAddress._links.address.href;

      data = yield call(api.updateAddress, {
        url: updateProfileAddressLink,
        data: values,
      });

      if (data) {
        const { _links, ...newAddressData } = data;

        updatedAddresses = updatedAddresses.map(address =>
          address._links.address.href.toLowerCase() === _links.self.href.toLowerCase()
            ? { ...address, address: { ...newAddressData } }
            : address,
        );
      }

    } else {
      const createProfileAddressLink = getAddressPreferredApi(state);

      // TODO Clarify where should we get AddressLocationType
      data = yield call(api.createAddress, {
        url: createProfileAddressLink,
        data: {
          ...values,
          AddressLocationType: 'residential',
        },
      });

      if (data) {
        updatedAddresses.push({ ...data, addressTypeEnum: action.payload.AddressType });
      }
    }

    if (data) {
      yield put(actions.saveAddressSuccess(updatedAddresses));
    } else {
      yield put(actions.saveAddressFailure());
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.saveAddressFailure(action.payload));
  }
}

function* watchFetchAddressRequest() {
  yield takeLatest(FETCH_PROFILE_SUCCESS, fetchAddresses);
}
function* watchSaveAddressRequest() {
  yield takeLatest(actions.SAVE_ADDRESS_REQUEST, saveAddress);
}

const addressSagaWatchers = [
  watchFetchAddressRequest,
  watchSaveAddressRequest,
];
export default addressSagaWatchers;
