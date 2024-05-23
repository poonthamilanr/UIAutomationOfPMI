import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from 'foundation/AppStart/client/actions';
import { getWorkflowSteps } from 'foundation/Workflow/client/WorkflowSettings/accessors';
import { launchExamDataProcessingGenerator } from 'foundation/AppStart/client/appDataProcessGenerators';
import ApplicationStart from '../ApplicationStart';

class ExamStart extends React.Component {

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
    const { fetchAppData } = this.props;

    return (
      <ApplicationStart
        fetchApplicationData={fetchAppData}
        customLaunchAppDataProcessingGenerator={launchExamDataProcessingGenerator}
        workflowType='MCExam'
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
)(ExamStart);
