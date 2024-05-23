import { raiseAnalyticsTracking } from "../components/AdobeAnalytics/helpers/framework-script";

export const getViewedPageName = state => state.adobeAnalytics.viewedPageName;

export const getScreenLoadState = state => state.adobeAnalytics.isScreenLoad;

export function trackGeneralPageLink({linkTracking}){
  if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
  {
    const genralLinkData = {
      event: "linkclick",
      eventInfo: "linkclick",
      link: {
        linkTitle: linkTracking.linkTitle,
        linkModule: linkTracking.linkModule,
        targetURL: linkTracking.targetUrl !== undefined ?  linkTracking.targetUrl : '',
      },
    };
    raiseAnalyticsTracking("pmi-add-tracking", genralLinkData);
  }
}

export function certDataClickTracking(applicationData,action,event) {
  if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
  {
    if(applicationData)
    {
      const eventVal = (event !== undefined  && event !== null) ? event : 'application:click';
      const certData = {
        event: eventVal,
        eventInfo: eventVal,
        certification: {
          applicationID: applicationData.id.toString(),
          certName: applicationData.certificationTypeEnum,
          status: applicationData.applicationStatusEnum,
        },
        action: action.replace(' ','-'),
      };
      raiseAnalyticsTracking("pmi-add-tracking", certData);
    }
  }
}

export function trackFormFocus(formname){
  if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
  {
    const formTrackData = {
      event: "form-interaction",
      eventInfo: "form-interaction",
      form: {
        action: "form-start",
        formName: formname,
        formError: "",
      },
    };
    raiseAnalyticsTracking("pmi-add-tracking", formTrackData);
  }
}
export function trackFormError(formname, errors){
  if(errors !== undefined && errors !== null)
  {
    const errorMsg = Object.keys(errors).join();
    if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
    {
      const formTrackData = {
        event: "form-interaction",
        eventInfo: "form-interaction",
        form: {
          action: "form-error",
          formName: formname,
          formError: errorMsg,
        },
      };
      raiseAnalyticsTracking("pmi-add-tracking", formTrackData);
    }
  }
}

export function trackFormSubmission(formname){
  if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
  {
    const formTrackData = {
      event: "form-interaction",
      eventInfo: "form-interaction",
      form: {
        action: "form-completed",
        formName: formname,
        formError: "",
      },
    };
    raiseAnalyticsTracking("pmi-add-tracking", formTrackData);
  }
}

export function trackException(errorMessage){
  if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined)
  {
    const errorInfo = {
      event: "error-load",
      eventInfo: "error-load",
      page: {
        error: errorMessage,
      },
    };
    raiseAnalyticsTracking("pmi-add-tracking", errorInfo);
  }
}