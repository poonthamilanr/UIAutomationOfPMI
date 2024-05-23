/* eslint-disable */
import React from 'react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { compose } from 'redux'
import { connect } from 'react-redux';
import GraphQLData from 'foundation/Infrastructure/client/api/GraphQL/GraphQLData';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import applicationMock from 'foundation/Application/client/Application/mock';
import withRequirementsSettings from 'foundation/SitecoreSettings/client/RequirementsSettings';
import settingsQuery from './query.graphql';
import { setWorkflowSteps } from './actions';

const withWorkflow = options => WrappedComponent => {
  class WithWorkflowComponent extends React.Component {
    static displayName = `WithWorkflowComponent(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

    shouldComponentUpdate(nextProps) {
      const shouldComponentUpdate = options && options.shouldComponentUpdate;

      if (!shouldComponentUpdate) {
        return true;
      }

      if (shouldComponentUpdate(this.props, nextProps)) {
        return true;
      }

      return false;
    }

    buildConfiguration = () => {
      const { sitecoreContext, setWorkflow } = this.props;
      const settingsFolderPath = `${sitecoreContext.appRedirects.rootPath}/Settings`

      const configuration = {
        options: {
          variables: {
            workflowTypeFolderTemplate: "4E98EB66-28B8-4924-B15D-EA153189BE51",
            workflowTypeTemplate: "01C344A2-6F7E-4A3E-B238-B39CD0815F1B",
            settingsFolderPath,
          },
        },
        name: 'settingsContext',
        props: props => {
          const { settings } = props.settingsContext;
          const isCurrentStep = step => sitecoreContext && (sitecoreContext.route.itemId === step.id);
          const workflowTypes = settings && settings.workflowTypes[0].items;
          let workflowTypeKey = getWorkflowType();

          if (!workflowTypes || !workflowTypes.length) {
            return;
          }

          if (!workflowTypeKey && isPageSimulation()) {
            const mockWorkflowTypeKey = applicationMock.certificationTypeEnum;
            const availableWorkflowTypes = workflowTypes.filter(item => item.steps.targetItems.some(isCurrentStep));
            const mockWorkflowType = availableWorkflowTypes.find(item => item.apiKey.value === mockWorkflowTypeKey);
            const defaultType = mockWorkflowType || availableWorkflowTypes[0] || workflowTypes[0];
            workflowTypeKey = defaultType && defaultType.apiKey.value;
          }

          if (!workflowTypeKey) {
            return {workflow: {}};
          }

          const requirementsSettings = props.ownProps.requirementsSettingsContext.settings;

          if (!requirementsSettings) {
            return null;
          }

          const requirements = requirementsSettings.requirements.reduce((all, current) => all.concat(current.items), []);
          const worktypes = requirementsSettings.worktypes.reduce((all, current) => all.concat(current.items), []);
          const workflowType = workflowTypes.find(item => item.apiKey.value === workflowTypeKey);
          const mapRequirement = requirement => ({value: requirement ? requirement.apiKey.value : null});
          const extractRequirement = step => mapRequirement(step.requirementType && requirements.find(requirement => requirement.id === step.requirementType.targetId));
          const mapWorktypeRequirement = worktype => worktype && {value: worktype.apiKey.value};
          const extractWorktypeRequirements = step => step.worktypeRequirements && step.worktypeRequirements.targetIds.map(id => worktypes.find(worktype => worktype.id === id)).map(mapWorktypeRequirement);
          const steps = workflowType &&
            workflowType.steps.targetItems.map(item => ({
              ...item,
              requirementType: extractRequirement(item),
              worktypeRequirements: extractWorktypeRequirements(item)
            }));
          const currentStepIndex = steps && steps.findIndex(isCurrentStep);
          const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : undefined;
          const nextStep = currentStep && steps[currentStepIndex + 1];
          
          setWorkflow(steps);

          return {
            workflow: {
              steps,
              currentStep,
              nextStep,
            },
          }
        },
      }

      return configuration;
    }

    render() {
      const Component = GraphQLData(settingsQuery, this.buildConfiguration())(WrappedComponent);

      return <Component {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    setWorkflow: (data) => dispatch(setWorkflowSteps(data)),
  });

  return compose(
    withRequirementsSettings,
    connect(null, mapDispatchToProps)
  )(WithWorkflowComponent);
  
};

export default withWorkflow;