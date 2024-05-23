import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import * as actions from 'foundation/AppStart/client/actions';
import { launchOpenAppDataProcessingGenerator } from 'foundation/AppStart/client/appDataProcessGenerators';
import { getWorkflowSteps } from 'foundation/Workflow/client/WorkflowSettings/accessors';
import { getGlobalSettings } from 'foundation/SitecoreSettings/client/accessors';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import { getCertType as getStorageCertType } from "foundation/Application/client/certtype-storage";
import { getCertTypeFromRoute } from "foundation/Page/client/utils";
import ApplicationStart from '../ApplicationStart';

class EligibleToPayStart extends React.Component {

  componentDidUpdate() {
    const { workflowSteps, history } = this.props;
    if (workflowSteps) {
      const firstStep = workflowSteps.find(step => !step.isStartPage.value);
      if (firstStep && this.props.location.pathname !== firstStep.url) {
        history.push(firstStep.url);
      }
    }
  }

  render () {
    const { fetchAppData, sitecoreSettings } = this.props;
    const certTypeInput = getCertTypeFromRoute() || getStorageCertType() || '';
    if (!sitecoreSettings || !certTypeInput) {
      return "";
    }
    const certTypeItem = sitecoreSettings.certTypes.find(({apiKey}) => apiKey.value.toLowerCase() === certTypeInput.toLowerCase());
    const workflowType = certTypeItem && certTypeItem.isMicroCredential.value ? "MCETP" : "ETP";

    return (
      <ApplicationStart
        fetchApplicationData={fetchAppData}
        customLaunchAppDataProcessingGenerator={launchOpenAppDataProcessingGenerator}
        workflowType={workflowType}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  sitecoreSettings: getGlobalSettings(state),
  workflowSteps: getWorkflowSteps(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAppData: props => dispatch(actions.fetchAppData(props)),
});

export default compose(
  withSitecoreContext(),
  withGlobalSettings,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EligibleToPayStart);
