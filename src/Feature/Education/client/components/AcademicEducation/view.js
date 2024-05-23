import React from 'react';
import { connect } from 'react-redux';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import i18n from 'i18next';
import classNames from 'classnames';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { getEnumDisplayName } from 'foundation/SitecoreSettings/client/utils';
import * as uiActions from "./actions";
import './academicEducationView.scss';

const Property = ({ value, enabled, label }) => {
  if (!value || (enabled !== undefined && !enabled)) {
    return null;
  }

  return (
    <div className="academic-education-property">
      <div className="academic-education-property__label">{label}</div>
      <div className="academic-education-property__value">{value}</div>
    </div>
  );
};

const AcademicEducationView = (props) => {
  const { academicEducation, openForm, hideChangeOption, settings, className, fields } = props;

  if (!academicEducation) {
    return null;
  }

  const {
    degreeEnum,
    schoolName,
    fieldOfStudyEnum,
    yearStarted,
    yearOfDegree,
    schoolCountry,
    accreditedUniversityDegree,
  } = academicEducation;

  const isUniversity = degreeEnum && degreeEnum.toLowerCase() !== 'highschooldiploma';
  const isDegreeProgram = academicEducation.accreditedUniversityDegreeId;
  const requirementsMet = true;

  return (
    <div className={classNames(className, "academic-education", "academic-education__view")}>
      <div className="academic-education__header d-flex flex-row">
        <span>{getEnumDisplayName(settings.academicEducationLevels, degreeEnum)}</span>
        {!requirementsMet &&
          <>
            <span className="ml-1 mr-1"> - </span>
            <span className="error"><Text field={fields.ViewModeRequirementsNotMet} /></span>
          </>}
      </div>
      <div className="academic-education__body">
        <div className="academic-education__properies-column">
          <Property
            value={yearOfDegree && [yearStarted, yearOfDegree].filter(v => v).join(' - ')}
            label={<Text field={fields.ViewModeYearsAttended} />}
          />
          <Property
            value={schoolName}
            label={<Text field={isUniversity ? fields.ViewModeNameOfInstitution : fields.ViewModeNameOfSchool} />}
          />
        </div>
        <div className="academic-education__properies-column">
          <Property
            value={schoolCountry && schoolCountry.country}
            label={<Text field={fields.ViewModeCountryOfInstitution} />}
          />
          <Property
            value={isDegreeProgram ?
              accreditedUniversityDegree && accreditedUniversityDegree.name :
              getEnumDisplayName(settings.fieldOfStudy, fieldOfStudyEnum)}
            label={<Text field={isDegreeProgram ? fields.ViewModeDegreeProgram : fields.ViewModeFieldOfStudy} />}
          />
        </div>
      </div>
      {!hideChangeOption && (
        <div className="academic-education__buttons">
          <LinkButton
            className="with-icon link-base"
            onClick={openForm}
            icon={IconPencil}
            titleText={i18n.t('cert-app.Education.AcademicEducation.EditEducation')}
          />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(uiActions.setIsOpen(true)),
});

export default connect(null, mapDispatchToProps)(AcademicEducationView);
