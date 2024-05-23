import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import i18n from 'i18next';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import CircleCheck from '@pmi/dsm-react-bs4/dist/components/icons/16/CircleCheckIcon';
import { getExperience, getExperienceRequirements } from 'foundation/Application/client/Experience/accessors';

class ExperienceSummary extends React.PureComponent {
  render() {
    const { experienceDetails, experienceRequirements, fields } = this.props;
    const { requirementMet, monthsRequired, monthsQualified, creditedMonths } = experienceRequirements;

    if (monthsRequired === 0) {
      return null;
    }

    const summaryTotalClasses = classNames(
      'summary__total',
      { 'summary_complete': requirementMet },
    );

    return (
      <div className="summary-container">
        {creditedMonths && creditedMonths > 0 ?
          <div className="summary__course-line">
            <div><Text field={fields.EditModeGacExperienceSummary} /></div>
            <div className="text-nowrap">{creditedMonths} {creditedMonths !== 1 ? i18n.t('cert-app.Common.Months') : i18n.t('cert-app.Common.Month')}</div>
          </div>:""}
        {experienceDetails && experienceDetails.map((experience, i) => {
          const summaryCourseLineClasses = classNames(
            'summary__course-line',
            { 'not_qualified': !experience.isQualified },
          );

          return (
            <div className={summaryCourseLineClasses} key={i}>
              <div>{experience.title}</div>
              <div className="text-nowrap">
                {experience.monthsQualified} {experience.monthsQualified !== 1 ? i18n.t('cert-app.Common.Months') : i18n.t('cert-app.Common.Month')}
              </div>
            </div>
          )
        })}
        <div className={summaryTotalClasses}>
          <div className="mr-1">{i18n.t('cert-app.Common.Total')}</div>
          {monthsRequired &&
            <div className="summary__hours">
              {monthsQualified >= monthsRequired
                ? <CircleCheck className='btn-icon' />
                : <span>{monthsQualified} {i18n.t('cert-app.Common.Of')} </span>}
              {monthsRequired} {monthsRequired !== 1 ? i18n.t('cert-app.Common.Months') : i18n.t('cert-app.Common.Month')}
            </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  experienceArray: getExperience(state),
  ...getExperienceDetails(state, ownProps),
});

const getExperienceDetails = (state, ownProps) => {
  const worktypeItem = ownProps.fields && ownProps.fields.Worktype;

  if (!worktypeItem || !worktypeItem.fields || !worktypeItem.fields.ApiKey) {
    return {
      experienceDetails: undefined,
      experienceRequirements: {},
    }
  }

  const worktype = worktypeItem && worktypeItem.fields.ApiKey.value;

  const experienceRequirements = getExperienceRequirements(state);

  if (!experienceRequirements || !experienceRequirements[worktype]) {
    return {
      experienceDetails: undefined,
      experienceRequirements: {},
    }
  }

  return {
    experienceDetails: experienceRequirements[worktype].experienceDetails,
    experienceRequirements: experienceRequirements[worktype],
  }
};

export default connect(
  mapStateToProps,
  null,
)(ExperienceSummary);