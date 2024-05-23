import React from 'react';
import { connect } from 'react-redux';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';
import { getEducationRequirements } from 'foundation/Application/client/ProfessionalEducation/accessors';

class RequirementsContainer extends React.PureComponent {
  requirementsExist() {
    const { requirements } = this.props;

    const { hoursRequired } = requirements;

    return !(!hoursRequired || hoursRequired === 0);
  }

  render() {
    const { rendering } = this.props;

    if (!isPageSimulation() && !this.requirementsExist()) {
      return null;
    }

    return (
      <div>
        <Placeholder name='cert-app-requirements-content' rendering={rendering} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  requirements: getEducationRequirements(state),
});

const requirementsContainer = connect(
  mapStateToProps,
  null,
)(RequirementsContainer);

export default withSitecoreContext()(requirementsContainer);