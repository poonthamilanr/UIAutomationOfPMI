import { call, put, select, takeLatest } from "redux-saga/effects";
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import withAppRequirements from "foundation/AppRequirements/client/withAppRequirements";
import { getCertType } from "foundation/Application/client/certtype-storage";
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import { getUrlParameter } from 'foundation/Page/client/utils';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { isAdminProfile } from 'foundation/Profile/client/Profile/api';
import { raiseAnalyticsTracking } from 'foundation/Analytics/client/components/AdobeAnalytics/helpers/framework-script'
import { logException } from 'foundation/Log/client/Exception';
import { fetchApplicationPaymentInfo } from '../PaymentInfo/api';
import { getApplicationApi } from './accessors';
import * as actions from "./actions";
import * as api from "./api";

const fetchApplication = function* () {
  try {
    const certType = getCertType();
    const workflowType = getWorkflowType();
    const isETP = workflowType && (workflowType === "ETP" || workflowType === "MCETP");

    // TODO: Ensure we can use same Failure and Success actions for open and active application endpoints
    // to yield call(api.fetchOpenApplication, certType) istead of put(actions.fetchOpenApplication())
    if (isETP) {
      yield put(actions.fetchOpenApplication());
    } else if ((certType && !isETP) || isPageSimulation()) {
      const data = yield call(api.fetchActiveApplication, certType);
      yield put(actions.fetchApplicationSuccess(data));
    } else {
      yield put(actions.fetchApplicationFailure());
      const { appRedirects } = getSitecoreContext();
      window.location.href = appRedirects.redirectLinks.InvalidUrlPage;
    }
  } catch (err) {
    yield put(actions.fetchApplicationFailure());
    if (err.response.status === 404 || err.response.status === 204) {
      yield call(logException, {
        logMessage: 'fetch application failure',
        source: err,
      });
      const { appRedirects } = getSitecoreContext();
      const redirectUrls = appRedirects.redirectLinks;
      window.location.href = redirectUrls.Sorry;
    }
  }
};

const fetchApplicationWithAppRequirements = withAppRequirements(fetchApplication);

// eslint-disable-next-line no-unused-vars
function* fetchOpenApplication() {
  const certType = getCertType();
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;

  try {
    if (certType || isPageSimulation()) {
      const data = yield call(api.fetchOpenApplication, certType);
      const workflowType = getWorkflowType();

      if (workflowType === 'EDIT_SUMMARIES' && data.applicationStatusEnum !== 'PanelReviewInProgress') {
        yield put(actions.fetchOpenApplicationFailure());
        yield call(logException, {
          logMessage: 'fetch open application failure',
          source: 'edit summaries panel review in progress failed',
        });
        window.location.href = `${redirectUrls.Sorry}?errorcode=NoEditSummariesApplication`;
        return;
      }
      if (workflowType === 'ETP' && data.applicationStatusEnum !== 'EligibleToPay') {
        yield put(actions.fetchOpenApplicationFailure());
        yield call(logException, {
          logMessage: 'fetch open application failure',
          source: 'No Eligible To Pay Application',
        });
        window.location.href = `${redirectUrls.Sorry}?errorcode=NoEligibleToPayApplication`;
        return;
      }

      yield put(actions.fetchOpenApplicationSuccess(data));
    }
    else {
      console.error('certType is missing');
      yield put(actions.fetchOpenApplicationFailure());
    }
  } catch (err) {
    yield put(actions.fetchOpenApplicationFailure());
    if (err.response.status === 404 || err.response.status === 204) {
      yield call(logException, {
        logMessage: 'fetch open application failure',
        source: err,
      });
      window.location.href = redirectUrls.Sorry;
    }
  }
}

function isLegacyAuditPage()
{
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;
  return (window.location.href.indexOf(redirectUrls.AuditLegacyFlow) !== -1);
}
function* fetchAuditApplication() {
  const certType = getCertType();
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;

  try {
    if (certType || isPageSimulation()) {
      let isAdmin = false;
      let data = null;
      if(getUrlParameter('admin') !== "")
      {
        const isAdminProfileData = {
          "ecryptedText": getUrlParameter('admin'),
        };
        isAdmin = yield call(isAdminProfile, isAdminProfileData);
        if(isAdmin && getUrlParameter('AppID') !== "")
        {
          data = yield call(api.fetchAuditApplicationById, getUrlParameter('AppID'));
        }
      }
      if(data === null)
      {
        data = yield call(api.fetchAuditApplication, certType);
      }
      data.IsAdminView = isAdmin;
      if(data.applicationStatusEnum === 'ClosedFailAudit' && !isAdmin)
      {
        yield put(actions.fetchAuditApplicationFailure());
        yield call(logException, {
          logMessage: 'fetch audit application failure',
          source: 'Application in failed audit state',
        });
        window.location.href = `${redirectUrls.Sorry}?errorcode=FailedAudit`;
      }
      else if(data.auditStatusEnum === 'AuditDocumentationReceived' && !isAdmin)
      {
        yield put(actions.fetchAuditApplicationFailure());
        window.location.href = `${redirectUrls.AuditReceived}`;
      }
      else if(certType !== 'CAPM' && !isLegacyAuditPage() && (data.auditPacketId === undefined || data.auditPacketId === '' || data.auditPacketId === null))
      {
        yield put(actions.fetchAuditApplicationSuccess(data));
        window.location.href = `${redirectUrls.AuditLegacyFlow}`;
      }
      else{
        yield put(actions.fetchAuditApplicationSuccess(data));
      }
    }
    else {
      console.error('certType is missing');
      yield put(actions.fetchAuditApplicationFailure());
      yield call(logException, {
        logMessage: 'fetch audit application failure',
        source: 'No cert type',
      });
      window.location.href = `${redirectUrls.Sorry}?errorcode=NoCertType`;
      return;
    }
  } catch (err) {
    yield put(actions.fetchAuditApplicationFailure());
    if (err.response.status === 404 || err.response.status === 204) {
      yield call(logException, {
        logMessage: 'fetch audit application failure',
        source: err,
      });
      window.location.href = redirectUrls.Sorry;
    }
  }
}

function* redirectToPayment() {
  const certType = getCertType();
  const paymentInfo = yield call(fetchApplicationPaymentInfo, certType);
  if(paymentInfo.sku && paymentInfo.sku !== '')
  {
    window.location.href = `${paymentInfo.landingPageUrl}?sku=${paymentInfo.sku}`;
  }
  else
  {
    const url = `${paymentInfo.landingPageUrl}?personID=${paymentInfo.personId}&orderType=${paymentInfo.orderType}&applicationID=${paymentInfo.applicationId}&credential=${paymentInfo.credential}&examID=${paymentInfo.examId}&examType=${paymentInfo.examType}&retake=${paymentInfo.retake}&countryCode=${paymentInfo.countryCode}`;
    window.location.href = url;
  }
}

function* closeApplication() {
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;
  try {
    const state = yield select();
    const appApiUrl = getApplicationApi(state);
    yield call(api.closeApplication, appApiUrl);
    yield put(actions.closeApplicationSuccess());
    window.location.href =  `${redirectUrls.CloseApplication}`;
  } catch (ex) {
    console.log(ex);
    yield put(actions.closeApplicationFailure());
  }
}

function* submitApplication(action) {
  const { history } = action.payload;
  const { appRedirects } = getSitecoreContext();
  const redirectUrls = appRedirects.redirectLinks;

  try {
    const redirectUrlsForAccomodation = redirectUrls;
    const state = yield select();
    const workflowType = getWorkflowType();
    const certType = getCertType();
    const settings = getGlobalSettings(state);
    const certTypeItem = settings.certTypes.find(({apiKey}) => apiKey.value.toLowerCase() === certType.toLowerCase());
    const isMicroCredential = certTypeItem && certTypeItem.isMicroCredential && certTypeItem.isMicroCredential.boolValue;

    if (workflowType === "ETP" || workflowType === "MCETP") {
      if (isMicroCredential) {
        yield call(redirectToPayment);
      } else {
        const openData = yield call(api.fetchOpenApplication, certType);
        const openActiveExam =  openData._embedded.exams.resources.find(exam => exam.isActive === true);
        const isActiveAtaPBT = openActiveExam.examVendorEnum==='ATA' && openActiveExam.examTypeEnum === 'PBT';
        if(isActiveAtaPBT) {
          yield call(history.push, `${redirectUrls.MyPMIEligibleToPay}?isChVendor=${isActiveAtaPBT}`);
        } else {
          yield call(history.push, `${redirectUrls.EligibleToPay}?isChVendor=${isActiveAtaPBT}`);
        }
      }
      return;
    }

    const appApiUrl = getApplicationApi(state);
    const data = yield call(api.submitApplication, appApiUrl);
    submitAdobeTracking(data);
    const activeExam =  data._embedded.exams.resources.find(exam => exam.isActive === true);
    const isSpecialAccomodationRequired = activeExam.specialAccommodations.requested;
    const isChVendor = activeExam.examVendorEnum==='ATA';

    yield put(actions.submitApplicationSuccess(data));

    if (isMicroCredential) {
      yield call(redirectToPayment);
    } else if (isSpecialAccomodationRequired && redirectUrlsForAccomodation[`${data.applicationStatusEnum}Accommodations`]) {
      const accomodationRedirectUrl = redirectUrlsForAccomodation[`${data.applicationStatusEnum}Accommodations`];
      yield call(history.push, `${accomodationRedirectUrl}?isChVendor=${isChVendor}`);
    } else if (data.applicationStatusEnum === 'Audit') {
      yield call(history.push, `${redirectUrls.Audit}?auditDate=${data.dateAuditDue}`);
    }else if (redirectUrls[data.applicationStatusEnum]) {
      yield call(history.push, `${redirectUrls[data.applicationStatusEnum]}?isChVendor=${isChVendor}`);
    }
    else {
      yield call(history.push, `${redirectUrls.Sorry}?errorcode=SubmitFailed`);
    }
  } catch (err) {
    const data = err.response && err.response.data;
    console.log('Application submit error:', data || err); // eslint-disable-line no-console
    yield put(actions.submitApplicationFailure());
  }
}

function submitAdobeTracking(applicationData) {
  if(applicationData)
  {
    const eventValue = "cert-app:submitted";
    const certData = {
      event: eventValue,
      eventInfo: eventValue,
      certification: {
        applicationID: applicationData.id.toString(),
        certName: applicationData.certificationTypeEnum,
        step: window.location.pathname.split('/').filter(Boolean)[0],
        status: applicationData.applicationStatusEnum,
      },
      action: "submitted",
    };
    raiseAnalyticsTracking("pmi-add-tracking", certData);
  }
}

function* submitAuditApplication(action) {

  try {
    const state = yield select();
    const { history } = action.payload;
    const { appRedirects } = getSitecoreContext();
    const redirectUrls = appRedirects.redirectLinks;
    const appApiUrl = getApplicationApi(state);
    const data = yield call(api.submitAuditApplication, appApiUrl);
    yield put(actions.submitAuditApplicationSuccess(data));
    yield call(history.push, `${redirectUrls.AuditReceived}`);
  } catch (err) {
    const data = err.response && err.response.data;
    console.log('Audit Application submit error:', data || err); // eslint-disable-line no-console
    yield put(actions.submitAuditApplicationFailure());
  }
}

function* watchFetchApplicationRequest() {
  yield takeLatest(actions.FETCH_APPLICATION_REQUEST, fetchApplication);
  yield takeLatest(actions.FETCH_APPLICATION_WITH_APP_REQUIREMENTS_REQUEST, fetchApplicationWithAppRequirements);
}

function* watchFetchOpenApplicationRequest() {
  yield takeLatest(actions.FETCH_OPEN_APPLICATION_REQUEST, fetchOpenApplication);
}

function* watchFetchAuditApplicationRequest() {
  yield takeLatest(actions.FETCH_AUDIT_APPLICATION_REQUEST, fetchAuditApplication);
}

function* watchSubmitApplicationRequest() {
  yield takeLatest(actions.SUBMIT_APPLICATION_REQUEST, submitApplication);
}

function* watchSubmitAuditApplicationRequest() {
  yield takeLatest(actions.SUBMIT_AUDIT_APPLICATION_REQUEST, submitAuditApplication);
}

function* watchCloseApplicationRequest() {
  yield takeLatest(actions.CLOSE_APPLICATION_REQUEST, closeApplication);
}

const applicationSagaWatchers = [watchFetchApplicationRequest, watchSubmitApplicationRequest, watchSubmitAuditApplicationRequest, watchFetchOpenApplicationRequest, watchFetchAuditApplicationRequest, watchCloseApplicationRequest];
export default applicationSagaWatchers;
