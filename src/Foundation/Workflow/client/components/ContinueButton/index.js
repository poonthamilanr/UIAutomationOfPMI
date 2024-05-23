import React from 'react';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { Button } from '@pmi/dsm-react-bs4';
import { withRouter } from "react-router-dom";
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { getApplication} from 'foundation/Application/client/Application/accessors'
import { getAppRequirementsStatusPending, getRequirementMet } from 'foundation/AppRequirements/client/accessors';
import { trackGeneralPageLink, certDataClickTracking } from 'foundation/Analytics/client/AdobeAnalytics/accessors'
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import withWorkflow from '../../WorkflowSettings';
import CloseApplicationComponent from '../CloseApplication';
import BackMyPmiComponent from '../BackMyPmi';

const withContinueButton = options => WrappedComponent => {
  class ContinueButtonComponent extends React.PureComponent {
    static displayName = `ContinueButtonComponent(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

    onClick = () => {
      this.continue();
    }

    continue = () => {
      const { getRequirementMet, history, workflow, showLoader, region, applicationData } = this.props;
      const nextStep = workflow && workflow.nextStep;
      const currentStep = workflow && workflow.currentStep;
      const pageRequirementsMet = currentStep && getRequirementMet(currentStep.requirementType.value, currentStep.worktypeRequirements);

      if (pageRequirementsMet && nextStep) {
        showLoader();
        const linkTracking = {
          linkTitle: this.titleText(),
          linkModule: region,
          targetUrl: `https://${window.location.host}${nextStep.url}`,
        };
        certDataClickTracking(applicationData,this.titleText());
        trackGeneralPageLink({linkTracking});
        history.push(nextStep.url);
      } else {
        console.log('Error: Next step is not configured', nextStep)
      }
    }

    titleText = () => {
      const { workflow } = this.props;
      const nextStep = workflow && workflow.nextStep;
      const nextTitle = nextStep && (nextStep.workflowStepName.value || nextStep.displayName);
      const title = nextTitle ? `${i18n.t('cert-app.Common.ContinueTo')} ${nextTitle}` : i18n.t('cert-app.Common.Continue');
      return title;
    }

    render() {
      const { workflow, appRequirementsPending, getRequirementMet, region } = this.props;
      const currentStep = workflow && workflow.currentStep;
      const pageRequirementsMet = currentStep && getRequirementMet(currentStep.requirementType.value, currentStep.worktypeRequirements);
      return (
        <div id={region} className='form-action-row border-top' adoberegion={region}>
          <BackMyPmiComponent />
          <CloseApplicationComponent />
          <Button
            disabled={appRequirementsPending || !pageRequirementsMet}
            onClick={this.onClick}
            titleText={this.titleText()}
            size='lg'
            variant='primary'/>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    region: 'continue-button-panel',
    appRequirementsPending: getAppRequirementsStatusPending(state),
    applicationData: getApplication(state),
    getRequirementMet: (requirementType, worktypeRequirements) => getRequirementMet(requirementType, worktypeRequirements)(state),
  });

  const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(loaderActions.showPageLoader()),
  });

  return withSitecoreContext()(withRouter(withWorkflow(options)(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ContinueButtonComponent))));
};

export default withContinueButton;
