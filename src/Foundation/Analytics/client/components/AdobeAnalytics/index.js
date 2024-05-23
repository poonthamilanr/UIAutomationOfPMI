import React from 'react';
import { connect } from 'react-redux';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getCertType } from "foundation/Application/client/certtype-storage";
import { getApplication } from 'foundation/Application/client/Application/accessors';
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import config from 'foundation/Config/client';
import Cookies from 'js-cookie';

import {
  getViewedPageName,
  getScreenLoadState,
  trackException,
} from 'foundation/Analytics/client/AdobeAnalytics/accessors';

import {
  trackPageView,
  setScreenLoad,
} from 'foundation/Analytics/client/AdobeAnalytics/actions';
import { raiseAnalyticsTracking } from "./helpers/framework-script";

class AdobeAnalytics extends React.Component {
  executedOnce = false;

  componentDidMount() {
    this.handleState();
  }

  componentDidUpdate() {
    this.handleState();
  }

  handleState() {

    const { applicationData } = this.props;

    if(window.adobeDataLayer !== null && window.adobeDataLayer !== undefined &&
    (applicationData || window.location.pathname.indexOf('/landing/') !== -1) && !this.executedOnce && !isPageSimulation())
    {
      const pageName = this.getPageName();
      this.trackDataLayer(pageName);
      this.executedOnce = true;
      if(window.location.href.indexOf(config.pageNotFoundPath) !== -1)
      {
        trackException(`404: page not found: ${window.localStorage.getItem('prevPage')}`);
      }
    }
  }

  trackDataLayer(){
    const { applicationData, setScreenLoad, isScreenLoadState} = this.props;

    const pageEventInfo= isScreenLoadState ? "screenload" : "pageload";
    const pageData = {
      event: pageEventInfo,
      eventInfo: pageEventInfo,
      user: {
        loginStatus: Cookies.get('authToken') ? "logged-in" : "logged-out",
      },
    };
    if(isScreenLoadState)
    {
      raiseAnalyticsTracking("pmi-reset-tracking");
    }
    setScreenLoad(true);
    const { globalSettings } = getSitecoreContext();
    const userState = globalSettings?.analytics?.userState;
    if(userState &&  Cookies.get('authToken'))
    {
      const analyticsObject = {
        event: 'loggedin',
        eventInfo: 'loggedin',
        user: {
          membershipTier: userState.membershipType || '',
          pmiID: userState.profileNames?.personId || '',
          membershipSegment: userState.membershipType ? 'member' : 'non-member',
          certificationSegment: userState.certificates?.length >= 1 ? 'certified' : 'non-certified',
          userSegment: userState.segmentationGroup?.name || '',
        },
      };
      raiseAnalyticsTracking("pmi-add-tracking", analyticsObject);
    }
    if(applicationData)
    {
      const eventValue = "cert-app-load";
      const appAction = applicationData.isNewApplication ? "opens" : "continue";
      const stepValue =  window.location.pathname.split('/').filter(Boolean)[0];
      const certData = {
        event: eventValue,
        eventInfo: eventValue,
        certification: {
          applicationID: applicationData.id.toString(),
          certName: applicationData.certificationTypeEnum,
          step: stepValue,
          status: applicationData.applicationStatusEnum,
        },
        action: appAction,
      };
      raiseAnalyticsTracking("pmi-add-tracking", certData);
    }
    raiseAnalyticsTracking("pmi-push-tracking", pageData);
  }

  getPageName() {
    return ['pmi', 'certification'].concat(window.location.pathname.split('/').filter(Boolean)).join(':');
  }

  getCertType() {
    return getCertType();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  viewedPageName: getViewedPageName(state),
  globalSettings: getGlobalSettings(state),
  applicationData: getApplication(state),
  isScreenLoadState: getScreenLoadState(state),
});

const mapDispatchToProps = dispatch => ({
  trackPageView: data => dispatch(trackPageView(data)),
  setScreenLoad: data => dispatch(setScreenLoad(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdobeAnalytics);
