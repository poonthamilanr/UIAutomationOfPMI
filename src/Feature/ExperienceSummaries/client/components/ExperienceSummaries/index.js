import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import * as applicationActions from "foundation/Application/client/Application/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getApplication, getApplicationRequestIdle } from 'foundation/Application/client/Application/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withPageWorkflowValidation from 'foundation/Workflow/client/withPageWorkflowValidation';
import './experienceSummaries.scss';

class ExperienceSummaries extends React.Component {
  componentDidMount() {
    const { applicationData, applicationRequestIdle, fetchApplicationData, hideLoader } = this.props;
    hideLoader();
    if (!applicationData && applicationRequestIdle) {
      fetchApplicationData();
    }
  }

  render() {
    const { rendering } = this.props;

    return (
      <div className="layout__content layout__content-experience-summaries">
        <Placeholder name="cert-app-experience-summaries" rendering={rendering} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  applicationRequestIdle: getApplicationRequestIdle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApplicationData: () => dispatch(applicationActions.fetchApplicationWithAppRequirements()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default compose(
  withSitecoreContext(),
  withWorkflow(),
  withGlobalSettings,
  withPageWorkflowValidation,
  connect(mapStateToProps, mapDispatchToProps),
)(ExperienceSummaries);
