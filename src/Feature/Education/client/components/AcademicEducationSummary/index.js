import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import i18n from 'i18next';
import { getAcademicEducation } from 'foundation/Application/client/AcademicEducation/accessors';
import CircleCheck from '@pmi/dsm-react-bs4/dist/components/icons/16/CircleCheckIcon';
import './academicEducationSummary.scss';

class AcademicEducationSummary extends React.PureComponent {
  render() {
    const { academicEducation } = this.props;
    const academicEducationComplete = academicEducation && academicEducation.schoolCountryCode;
    const academicEducationClasses = classNames(
      'summary-container academic-education-summary',
      { 'academic-education-summary_complete': academicEducationComplete },
    );

    return (
      <div className={academicEducationClasses} >
        {academicEducationComplete && <CircleCheck className='btn-icon' />}
        <span className='ml-2'>{i18n.t('cert-app.Education.AcademicEducationSummary.SecondaryDegree')}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  academicEducation: getAcademicEducation(state),
});

export default connect(
  mapStateToProps,
  null,
)(AcademicEducationSummary);
