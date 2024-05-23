import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from 'foundation/AppStart/client/actions';
import { launchAuditAppDataProcessingGenerator } from 'foundation/AppStart/client/appDataProcessGenerators';
import { getWorkflowSteps } from 'foundation/Workflow/client/WorkflowSettings/accessors';
import { getUrlParameter } from 'foundation/Page/client/utils';
import ApplicationStart from '../ApplicationStart';

class AuditStart extends React.Component {

  componentDidUpdate() {
    const { workflowSteps, history } = this.props;

    if (workflowSteps) {
      const firstStep = workflowSteps.find(step => !step.isStartPage.value);

      if (firstStep && this.props.location.pathname !== firstStep.url) {
        if(getUrlParameter('admin') !== "")
        {
          if(getUrlParameter('AppID') !== "")
          {
            history.push(`${firstStep.url}?admin=${getUrlParameter('admin')}&AppID=${getUrlParameter('AppID')}`);
          }
          else
          {
            history.push(`${firstStep.url}?admin=${getUrlParameter('admin')}`);
          }
        }
        else
        {
          history.push(firstStep.url);
        }
      }
    }
  }

  render () {
    const { fetchAppData } = this.props;

    return (
      <ApplicationStart
        fetchApplicationData={fetchAppData}
        customLaunchAppDataProcessingGenerator={launchAuditAppDataProcessingGenerator}
        workflowType='AUDIT'
      />
    )
  }
}

const mapStateToProps = (state) => ({
  workflowSteps: getWorkflowSteps(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAppData: props => dispatch(actions.fetchAppData(props)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AuditStart);
