import { call, put, takeLatest } from "redux-saga/effects";
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getCertType } from "foundation/Application/client/certtype-storage";
import * as actions from "./actions";
import * as api from "./api";

function* fetchPaymentInfo() {
  try {
    const certType = getCertType();

    if (certType || isPageSimulation()) {
      const data = yield call(api.fetchApplicationPaymentInfo, certType);
      yield put(actions.fetchPaymentInfoSuccess(data));
    }
    else {
      console.error('certType is missing');
      yield put(actions.fetchPaymentInfoFailure());
    }

  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    yield put(actions.fetchPaymentInfoFailure());
  }
}

function* watchFetchPaymentInfoRequest() {
  yield takeLatest(actions.FETCH_PAYMENT_INFO_REQUEST, fetchPaymentInfo);
}

const paymentInfoSagaWatchers = [ watchFetchPaymentInfoRequest ];
export default paymentInfoSagaWatchers;
