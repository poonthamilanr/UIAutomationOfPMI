import React from 'react';
import { withRouter } from "react-router-dom";
import classNames from 'classnames';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import CheckIcon from '@pmi/dsm-react-bs4/dist/components/icons/16/CheckIcon';
import withWorkflow from 'foundation/Workflow/client/WorkflowSettings';
import "./breadcrumbs.scss";

class Breadcrumbs extends React.PureComponent {

  getSteps() {
    const { workflow } = this.props;
    const steps = workflow && workflow.steps;
    const showIn = step => step.showInBreadcrumbs.value;
    return steps ? steps.filter(showIn) : [];
  }

  getCurrentStep() {
    const { workflow } = this.props;
    return workflow.currentStep;
  }

  renderListItem  = (step, index, steps) => {
    const currentStep = this.getCurrentStep();
    const currentStepIndex = currentStep && steps.findIndex(arg => currentStep.id === arg.id);
    const title = step.workflowStepName.value || step.displayName || step.name;
    const isPassed = index < currentStepIndex;
    const isNextPassed = index + 1 < currentStepIndex;
    const isCurrent = index === currentStepIndex;
    const isInactive = !isPassed && !isCurrent;
    const itemClasses = classNames(
      'breadcrumbs__item',
      {
        'breadcrumbs__item_passed': isPassed,
        'breadcrumbs__item_next-passed': isNextPassed,
        'breadcrumbs__item_current': isCurrent,
      },
    );

    return (
      <li
        key={step.id}
        className={itemClasses}
      >
        {isPassed &&
          <a className="breadcrumbs__point breadcrumbs__point_passed" href={step.url}>
            <span className="breadcrumbs__title">{title}</span>
            <CheckIcon className="breadcrumbs__passed-point-center btn-icon"/>
          </a>}
        {isCurrent &&
          <span className="breadcrumbs__point breadcrumbs__point_current">
            <span className="breadcrumbs__title">{title}</span>
            <span className="breadcrumbs__current-point-center"/>
          </span>}
        {isInactive &&
          <span className="breadcrumbs__point">
            <span className="breadcrumbs__title">{title}</span>
            <span className="breadcrumbs__inactive-point-center"/>
          </span>}
      </li>
    );
  }

  render() {
    const steps = this.getSteps();

    if (steps.length < 2) {
      return null;
    }

    const listClasses = classNames(
      'breadcrumbs',
      { 'breadcrumbs_center': steps.length === 2 },
    );

    return (
      <ul className={listClasses}>
        {steps.map(this.renderListItem)}
      </ul>
    );
  }
}

export default withSitecoreContext()(withRouter(withWorkflow()(Breadcrumbs)));
