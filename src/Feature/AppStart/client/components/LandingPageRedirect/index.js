import React from 'react';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getApplicationFlow } from 'foundation/Application/client/ApplicationFlow/accessors';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import * as applicationActions from 'foundation/Application/client/ApplicationFlow/actions'
import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';
import { getCertType as getStorageCertType } from "foundation/Application/client/certtype-storage";
import { getCertTypeFromRoute } from "foundation/Page/client/utils";

class LandingPageRedirect extends React.Component {

  componentDidMount() {
    const { applicationFlow, fetchApplicationFlow } = this.props;
    if (!applicationFlow) {
      const certType = getCertTypeFromRoute() || getStorageCertType() || '';
      fetchApplicationFlow(certType);
    }
  }

  render () {
    const certType = getCertTypeFromRoute() || getStorageCertType() || '';
    const { appRedirects } = getSitecoreContext();
    const redirectUrls = appRedirects.redirectLinks;
    const { applicationFlow } = this.props;
    if(applicationFlow)
    {
      try {
        if (applicationFlow === 'EligibleToPay') {
          window.location.href = `${redirectUrls.ETPFlow}/${certType}`;
        }
        else if (applicationFlow === 'Audit') {
          window.location.href = `${redirectUrls.AuditFlow}/${certType}`;
        }
        else if (applicationFlow === 'EditSummaries') {
          window.location.href = `${redirectUrls.EditSummaryFlow}/${certType}`;
        }
        else {
          window.location.href = `${redirectUrls.InitAppFlow}/${certType}`;
        }
      } catch (err) {
        if (err.response.status === 404 || err.response.status === 204) {
          window.location.href = redirectUrls.Sorry;
        }
      }
    }
    return null;
  }
}

const mapStateToProps = state => ({
  applicationFlow: getApplicationFlow(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApplicationFlow: (payload) => dispatch(applicationActions.fetchApplicationFlow(payload)),
});


export default compose(
  withSitecoreContext(),
  withGlobalSettings,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LandingPageRedirect);
