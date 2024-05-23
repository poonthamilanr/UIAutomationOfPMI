import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getAppDataRequestIdle } from "foundation/AppStart/client/accessors";
import * as actions from "foundation/AppStart/client/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { getAppRequirements, getRequirementMet, getAcademicEducationReqirements } from "foundation/AppRequirements/client/accessors";
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import { withEntryPointParameters } from 'foundation/EntryPoint/client/index';
import { launchApplicationAppDataProcessingGenerator } from 'foundation/AppStart/client/appDataProcessGenerators';

class ApplicationStart extends React.Component {
  componentDidMount() {
    const { appDataRequestIdle, certType, fetchAppData, sitecoreContext, history } = this.props;

    if (!appDataRequestIdle || isPageSimulation()) {
      return;
    }

    if (!certType) {
      window.location.href = sitecoreContext.appRedirects.redirectLinks.InvalidUrlPage;
      return;
    }

    const fetchApplicationData = this.props.fetchApplicationData || fetchAppData;
    const appDataProcessingGenerator = this.props.customLaunchAppDataProcessingGenerator || launchApplicationAppDataProcessingGenerator;
    const studentBundle = window && window.location.href.indexOf('studentBundle') > -1;
    const workflowType = this.props.workflowType || certType;

    this.props.showLoader();

    fetchApplicationData({
      appDataProcessingGenerator,
      certType,
      workflowType,
      studentBundle,
      history,
    });
  }

  componentDidUpdate() {
    const { appRequirements, getAcademicEducationRequirements, getRequirementMet, history, customLaunchAppDataProcessingGenerator, workflow } = this.props;

    if (customLaunchAppDataProcessingGenerator) {
      return;
    }

    const steps = workflow && workflow.steps;

    if (steps && appRequirements) {
      // Redirect to last step, if all requirements met
      if (appRequirements.requirementsMet && getAcademicEducationRequirements) {
        history.push(steps[steps.length - 1].url);
        return;
      }
      // Redirect to first step with requirements not met
      const nextStep = steps.find(step => (!getRequirementMet(step.requirementType.value, step.worktypeRequirements)
      ));
      if (nextStep) {
        history.push(nextStep.url);
        return;
      }
      // Redirect to first step
      const firstStep = steps.find(step => !step.isStartPage.value);
      if (firstStep) {
        history.push(firstStep.url);
      }
    }
  }

  render() {
    return (<div />);
  }
}

const mapStateToProps = state => ({
  appDataRequestIdle: getAppDataRequestIdle(state),
  appRequirements: getAppRequirements(state),
  getAcademicEducationRequirements: getAcademicEducationReqirements(state),
  getRequirementMet: (requirementType, worktypeRequirements) => getRequirementMet(requirementType, worktypeRequirements)(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAppData: (payload) => dispatch(actions.fetchAppDataWithAppRequirements(payload)),
  showLoader: () => dispatch(loaderActions.showPageLoader()),
});

export default compose(
  withSitecoreContext(),
  withGlobalSettings,
  withRouter,
  withEntryPointParameters,
  withWorkflow(),
  connect(mapStateToProps, mapDispatchToProps),
)(ApplicationStart);
