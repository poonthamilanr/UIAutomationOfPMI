import React from 'react';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';

class BaseValidationWrapper extends React.Component {
  state = {
    validationCompleted: false,
    isValid: undefined,
  };

  componentDidMount() {
    this.componentDidMountOrUpdate();
  }

  componentDidUpdate() {
    this.componentDidMountOrUpdate();
  }

  componentDidMountOrUpdate() {
    const { validationCompleted } = this.state;
    const { workflow } = this.props;

    if (workflow && !validationCompleted) {
      this.setState({validationCompleted: true});
      this.validatePageWorkflow();
    }
  }

  validatePageWorkflow() {
    const { workflow, sitecoreContext, history } = this.props;
    const { steps, currentStep } = workflow;
    const startStep = steps && steps.find(step => step.isStartPage.value);

    if (isPageSimulation() || currentStep) {
      this.setState({isValid: true});
    }
    else if (startStep) {
      this.setState({isValid: false});
      history.push(startStep.url);
    }
    else {
      this.setState({isValid: false});
      window.location.href = sitecoreContext.appRedirects.redirectLinks.InvalidUrlPage;
    }
  }

  render() {
    const { validationCompleted, isValid } = this.state;
    const { children } = this.props;

    const isClient = typeof window !== 'undefined';

    if (isClient && (!validationCompleted || !isValid)) {
      return null;
    }

    return children;
  }
}

const ValidationWrapper = compose(
  withRouter,
  withSitecoreContext(),
)(BaseValidationWrapper);

export default Component => props => {
  return (
    <ValidationWrapper {...props}>
      <Component {...props} />
    </ValidationWrapper>
  );
}