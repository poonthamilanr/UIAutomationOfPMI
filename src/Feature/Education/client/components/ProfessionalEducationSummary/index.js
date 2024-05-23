import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import i18n from 'i18next';
import { getEducationRequirements, getProfessionalEducation } from 'foundation/Application/client/ProfessionalEducation/accessors';
import CircleCheck from '@pmi/dsm-react-bs4/dist/components/icons/16/CircleCheckIcon';
import './professionalEducationSummary.scss';

class ProfessionalEducationSummary extends React.PureComponent {
  render() {
    const { requirements, educationArray } = this.props;
    const { requirementMet, hoursRequired, hoursTotal } = requirements;

    if (hoursRequired === 0) {
      return null;
    }

    const summaryTotalClasses = classNames(
      'summary__total',
      { 'summary_complete': requirementMet },
    );

    return (
      <div className="summary-container">
        {educationArray.map((education, i) => (
          <div className="summary__course-line" key={i}>
            <div>{education.courseTitle}</div>
            <div className="text-nowrap">{education.hoursTotal} {education.hoursTotal > 1 ? i18n.t('cert-app.Common.Hours') : i18n.t('cert-app.Common.Hour')}</div>
          </div>
        ))}
        <div className={summaryTotalClasses}>
          <div>{i18n.t('cert-app.Common.Total')}</div>
          <div className="summary__hours">
            {requirementMet
              ? <CircleCheck className='btn-icon' />
              : <span>{hoursTotal} {i18n.t('cert-app.Common.Of')} </span>}
            {hoursRequired} {hoursRequired > 1 ? i18n.t('cert-app.Common.Hours') : i18n.t('cert-app.Common.Hour')}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  educationArray: getProfessionalEducation(state),
  requirements: getEducationRequirements(state),
});

const professionalEducationSummary = connect(
  mapStateToProps,
  null,
)(ProfessionalEducationSummary);

export default professionalEducationSummary;