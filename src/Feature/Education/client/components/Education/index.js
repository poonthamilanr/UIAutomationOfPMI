import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import * as profileActions from "foundation/Profile/client/Profile/actions";
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getApplication, getApplicationRequestIdle } from 'foundation/Application/client/Application/accessors';
import { getProfile, getProfileRequestIdle } from 'foundation/Profile/client/Profile/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withListsSettings from 'foundation/SitecoreSettings/client/ListsSettings';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withPageWorkflowValidation from 'foundation/Workflow/client/withPageWorkflowValidation';

class Education extends React.Component {
  componentDidMount() {
    const { profileData, profileStatusIdle, applicationData, applicationRequestIdle, fetchProfileData, fetchApplicationData, hideLoader } = this.props;
    hideLoader();
    if (!applicationData && applicationRequestIdle) {
      fetchApplicationData();
      // OR redirect to /start
    }
    if (!profileData && profileStatusIdle) {
      fetchProfileData();
      // OR redirect to /start
    }
  }

  render() {
    const { rendering } = this.props;

    return <div className="layout__content"><Placeholder name="cert-app-education" rendering={rendering} /></div>
  }
}

const mapStateToProps = state => ({
  profileData: getProfile(state),
  profileStatusIdle: getProfileRequestIdle(state),
  applicationData: getApplication(state),
  applicationRequestIdle: getApplicationRequestIdle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProfileData: () => dispatch(profileActions.fetchProfile()),
  fetchApplicationData: () => dispatch(applicationActions.fetchApplicationWithAppRequirements()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default compose(
  withSitecoreContext(),
  withWorkflow(),
  withGlobalSettings,
  withListsSettings,
  withPageWorkflowValidation,
  connect(mapStateToProps, mapDispatchToProps),
)(Education);

