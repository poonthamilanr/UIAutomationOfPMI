import { call, put, takeLatest } from "redux-saga/effects";
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import { getCertType } from "foundation/Application/client/certtype-storage";
import { getCertTypeFromRoute } from "foundation/Page/client/utils";
import { logException } from 'foundation/Log/client/Exception';
import * as actions from "./actions";
import * as api from "./api";

function* fetchApplicationFlow() {
  const certType = getCertType() || getCertTypeFromRoute() || '';
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;
  try {
    if (certType || isPageSimulation()) {
      const data = yield call(api.fetchApplicationFlow, certType);
      yield put(actions.fetchApplicationFlowSuccess(data));
    }
    else {
      yield put(actions.fetchApplicationFlowFailure());
    }
  } catch (err) {
    yield put(actions.fetchApplicationFlowFailure());
    if (err.response.status === 404 || err.response.status === 204 ) {
      yield call(logException, {
        logMessage: 'fetch application failure',
        source: err,
      });
      window.location.href = redirectUrls.Sorry;
    }
  }
}

function* watchFetchApplicationFlowRequest() {
  yield takeLatest(actions.FETCH_APPLICATION_FLOW_REQUEST, fetchApplicationFlow);
}

const applicationSagaWatchers = [watchFetchApplicationFlowRequest];
export default applicationSagaWatchers;
