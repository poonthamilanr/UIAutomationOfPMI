import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getApplication, getApplicationRequestIdle } from 'foundation/Application/client/Application/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withNavigationsSettings from 'foundation/SitecoreSettings/client/NavigationsSettings';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withPageWorkflowValidation from 'foundation/Workflow/client/withPageWorkflowValidation';
import '../ExperienceSummaries/experienceSummaries.scss';

class EditExperienceSummaries extends React.Component {
  componentDidMount() {
    const { applicationData, applicationRequestIdle, fetchApplicationData, hideLoader } = this.props;
    hideLoader();
    if (!applicationData && applicationRequestIdle) {
      fetchApplicationData();
    }
  }

  render() {
    const { rendering } = this.props;

    return <div><Placeholder name="cert-app-experience-summaries" rendering={rendering} /></div>
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  applicationRequestIdle: getApplicationRequestIdle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApplicationData: () => dispatch(applicationActions.fetchOpenApplication()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default compose(
  withSitecoreContext(),
  withWorkflow(),
  withGlobalSettings,
  withNavigationsSettings,
  withPageWorkflowValidation,
  connect(mapStateToProps, mapDispatchToProps),
)(EditExperienceSummaries);
