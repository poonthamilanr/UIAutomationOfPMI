import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as experienceActions from "foundation/Application/client/Experience/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getApplication, getApplicationRequestIdle } from 'foundation/Application/client/Application/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withListsSettings from 'foundation/SitecoreSettings/client/ListsSettings';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withPageWorkflowValidation from 'foundation/Workflow/client/withPageWorkflowValidation';

class Experience extends React.Component {
  componentDidMount() {
    const { applicationData, applicationRequestIdle, fetchApplicationData, fetchExperienceSubprojects, hideLoader } = this.props;
    hideLoader();
    if (!applicationData && applicationRequestIdle) {
      fetchApplicationData();
    }
    fetchExperienceSubprojects();
  }

  render() {
    const { rendering } = this.props;

    return <div className="layout__content"><Placeholder name="cert-app-experience" rendering={rendering} /></div>
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  applicationRequestIdle: getApplicationRequestIdle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApplicationData: () => dispatch(applicationActions.fetchApplicationWithAppRequirements()),
  fetchExperienceSubprojects: () => dispatch(experienceActions.fetchExperienceSubprojects()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default compose(
  withSitecoreContext(),
  withWorkflow(),
  withGlobalSettings,
  withListsSettings,
  withPageWorkflowValidation,
  connect(mapStateToProps, mapDispatchToProps),
)(Experience);