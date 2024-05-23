import { all, fork } from "redux-saga/effects";
import appStartSagaWatchers from "foundation/AppStart/client/sagas";
import profileApiSagaWatchers from "foundation/Profile/client/sagas";
import applicationApiSagaWatchers from "foundation/Application/client/sagas";
import appRequirementsSagaWatchers from "foundation/AppRequirements/client/sagas";
import pageLoaderSagaWatchers from "foundation/FormFields/client/components/PageLoader/sagas";
import adobeAnalyticsSagaWatchers from "foundation/Analytics/client/AdobeAnalytics/sagas";
import navigationApiSagaWatchers from "foundation/Navigation/client/sagas";
import configSagaWatchers from "foundation/Config/client/sagas";

export default function* rootSaga() {
  yield all(
    [
      // API
      ...appStartSagaWatchers,
      ...appRequirementsSagaWatchers,
      ...profileApiSagaWatchers,
      ...applicationApiSagaWatchers,
      ...navigationApiSagaWatchers,
      ...configSagaWatchers,
      // UI
      ...pageLoaderSagaWatchers,
      ...adobeAnalyticsSagaWatchers,
    ].map(s => fork(s)),
  );
}
