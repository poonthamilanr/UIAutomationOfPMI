import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import withAppRequirements from "foundation/AppRequirements/client/withAppRequirements";
import { logException } from 'foundation/Log/client/Exception';
import * as profileActions from "foundation/Profile/client/Profile/actions";
import * as profileApi from "foundation/Profile/client/Profile/api";
import * as countriesApi from "foundation/Profile/client/Metadata/countries/api";
import * as actions from "./actions";

const fetchAppData = function* (action) {
  // Executed only on /start page
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;

  try {
    const { appDataProcessingGenerator, certType, history } = action.payload;

    if (!certType) {
      window.location.href = redirectUrls.InvalidUrlPage;
    }

    // Get embargoed countries and profile
    const [profile, embargo] = yield all([
      call(profileApi.fetchProfile),
      call(countriesApi.fetchEmbargoedCountries),
    ]);

    if (!embargo || !embargo.countries || !profile || !profile.countryOrigin) {
      yield put(actions.fetchAppDataFailure());
      yield call(history.push, `${redirectUrls.Sorry}?errorcode=missingData`)
      return;
    }
    // Check profile's country agains embargoed countries list
    if (embargo.countries.find(country => country.code === profile.countryOrigin)) {
      yield put(actions.fetchAppDataFailure());
      yield call(history.push, `${redirectUrls.Sorry}?errorcode=embargoedCountry`)
      return;
    }
    // Get application info
    if (appDataProcessingGenerator) {
      yield call(appDataProcessingGenerator, action.payload);
    }

    yield put(profileActions.fetchProfileSuccess(profile));
    yield put(actions.fetchAppDataSuccess());

  } catch (err) {
    yield put(actions.fetchAppDataFailure());
    if (err.response.status === 404) {
      yield call(logException, {
        logMessage: 'fetch application failure',
        source: err,
      });
      window.location.href = redirectUrls.Sorry;
    }
  }
};

const fetchAppDataWithAppRequirements = withAppRequirements(fetchAppData);

function* watchFetchAppDataRequest() {
  yield takeLatest(actions.FETCH_APP_DATA_REQUEST, fetchAppData);
  yield takeLatest(actions.FETCH_APP_DATA_WITH_APP_REQUIREMENTS_REQUEST, fetchAppDataWithAppRequirements);
}

const appStartSagaWatchers = [ watchFetchAppDataRequest ];

export default appStartSagaWatchers;
