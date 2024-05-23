import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import classNames from 'classnames';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import * as apiActions from "foundation/Application/client/AcademicEducation/actions";
import * as profileActions from "foundation/Profile/client/Profile/actions";
import { getCountryOrigin } from "foundation/Profile/client/Profile/accessors";
import { InstitutionSelect, SaveButton } from "foundation/FormFields/client/components";
import { getAccreditedUniversityDegrees } from "foundation/Profile/client/Metadata/accreditedUniversities/accessors";
import { getIsSavingStatus } from 'foundation/Application/client/AcademicEducation/accessors';
import { SelectField, YearsPeriod, CountrySelect } from "foundation/FormFields/client/components";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import GacField from "./GacField";

const specializationTypes = {
  FIELD_OF_STUDY: 'fieldOfStudy',
  DEGREE_PROGRAM: 'degreeProgram',
};
class AcademicEducationEdit extends React.Component {
  state = {
    isFormStart: false,
  };

  validationSchema = () => {
    const self = this;
    const { fields } = this.props;
    return Yup.object().shape({
      degreeEnum: Yup.string()
        .required(fields.DegreeEnumIsRequired.value),
      yearStarted: Yup.number()
        .required(fields.YearStartedIsRequired.value),
      yearOfDegree: Yup.number()
        .required(fields.YearOfDegreeIsRequired.value),
      schoolCountryCode: Yup.string()
        .required(fields.SchoolCountryCodeIsRequired.value),
      schoolName: Yup.string()
        .trim()
        .required(fields.SchoolNameIsRequired.value),
      fieldOfStudyEnum: Yup.string()
        .test('field-of-study-required', fields.FieldOfStudyEnumIsRequired.value, function (value) {
          const { degreeEnum, specializationType } = this.parent;
          const available = self.isFieldOfStudyAvailableLevel(degreeEnum);
          const selected = specializationType === specializationTypes.FIELD_OF_STUDY;
          return Boolean(value) || !selected || !available;
        }),
      accreditedUniversityDegreeId: Yup.number()
        .test('degree-program-required', fields.DegreeProgramIsRequired.value, function (value) {
          const { degreeEnum, specializationType } = this.parent;
          const available = self.isDergeeProgramAvailableLevel(degreeEnum);
          const selected = specializationType === specializationTypes.DEGREE_PROGRAM;
          return Boolean(value && typeof value === 'number') || !selected || !available;
        }),
    });
  };

  getEducationLevelsItem = name => {
    return this.props.settings.academicEducationLevels.find(level => level.name === name);
  }

  isDergeeProgramAvailableLevel = value => {
    const educationLevel = value && this.getEducationLevelsItem(value);
    return educationLevel && educationLevel.degreeProgramAvailable.boolValue;
  }

  isFieldOfStudyAvailableLevel = value => {
    const educationLevel = value && this.getEducationLevelsItem(value);
    return educationLevel && educationLevel.fieldOfStudyAvailable.boolValue;
  }

  cancelEditing = (e) => {
    e.preventDefault();
    const { setIsOpen } = this.props;
    setIsOpen(false);
  };

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values) => {
    const education = { ...values };
    const { degreeEnum, specializationType } = education;
    const degreeProgramAvailable = this.isDergeeProgramAvailableLevel(degreeEnum);
    const fieldOfStudyAvailable = this.isFieldOfStudyAvailableLevel(degreeEnum);

    if (!degreeProgramAvailable || specializationType !== specializationTypes.DEGREE_PROGRAM) {
      education.accreditedUniversityDegreeId = undefined;
      education.accreditedUniversityDegree = undefined;
    }

    if (!fieldOfStudyAvailable || specializationType !== specializationTypes.FIELD_OF_STUDY) {
      education.fieldOfStudyEnum = undefined;
      education.fieldOfStudyOther = undefined;
    }

    delete education.specializationType;
    this.props.saveAcademicEducation(education);
  };

  updateUniversityProperties = (formProps, university) => {
    formProps.setFieldValue("accreditedUniversity", university);
    formProps.setFieldValue("accreditedUniversityId", university && university.id || null);
    formProps.setFieldValue("schoolAddress1", university && university.schoolAddress1);
    formProps.setFieldValue("schoolAddress2", university && university.schoolAddress2);
    formProps.setFieldValue("schoolAddress3", university && university.schoolAddress3);
    formProps.setFieldValue("schoolCity", university && university.schoolCity);
    formProps.setFieldValue("schoolState", university && university.schoolState);
    formProps.setFieldValue("schoolPostalCode", university && university.schoolPostalCode);
    formProps.setFieldValue("isAccreditedUniversity", Boolean(university));
    formProps.setFieldValue("accreditedUniversityDegreeId", undefined);
    formProps.setFieldValue("accreditedUniversityDegree", undefined);
  }

  onEducationLevelSet = (formProps) => (option) => {
    const { value } = option;
    const { degreeEnum, isAccreditedUniversity } = formProps.values;
    const accreditedUniversityAvailable = this.isFieldOfStudyAvailableLevel(value);
    const wasDergeeProgramAvailable = this.isDergeeProgramAvailableLevel(degreeEnum);
    const dergeeProgramAvailable = this.isDergeeProgramAvailableLevel(value);

    if (isAccreditedUniversity && !accreditedUniversityAvailable) {
      formProps.setFieldValue('schoolName', '');
      formProps.setFieldValue("specializationType", specializationTypes.FIELD_OF_STUDY);
      this.updateUniversityProperties(formProps, undefined);
    }
    else if (!dergeeProgramAvailable) {
      formProps.setFieldValue("specializationType", specializationTypes.FIELD_OF_STUDY);
    }
    else if (isAccreditedUniversity && !wasDergeeProgramAvailable) {
      formProps.setFieldValue("specializationType", specializationTypes.DEGREE_PROGRAM);
    }
  }

  onCountrySet = (formProps) => (option, country) => {
    const { isAccreditedUniversity } = formProps.values;
    formProps.setFieldValue('schoolCountry', country);

    if (isAccreditedUniversity) {
      formProps.setFieldValue('schoolName', '');
      formProps.setFieldValue("specializationType", specializationTypes.FIELD_OF_STUDY);
      this.updateUniversityProperties(formProps, undefined);
    }
  }

  onUniversitySet = (formProps) => (isAccreditedUniversity, universityData) => {
    const university = universityData ? { ...universityData } : undefined;
    const { degreeEnum, accreditedUniversityId, yearOfDegree } = formProps.values;
    let specializationType = specializationTypes.FIELD_OF_STUDY;

    if (university) {
      if (accreditedUniversityId === university.id) {
        return;
      }

      if (this.isDergeeProgramAvailableLevel(degreeEnum)) {
        const universityDegrees = this.props.getUniversityDegrees(university.id);
        const universityDegreesOptions = universityDegrees ? universityDegrees.filter(this.filterDegreesByYear(yearOfDegree)) : [];

        if (universityDegreesOptions.length > 0)
        {
          specializationType = specializationTypes.DEGREE_PROGRAM;
        }
      }

      delete university.degrees;
    }

    formProps.setFieldValue("specializationType", specializationType);
    this.updateUniversityProperties(formProps, university);
  };

  onDegreeProgramSet = (formProps) => (option) => {
    const universityDegrees = this.props.getUniversityDegrees(formProps.values.accreditedUniversityId);
    const degree = universityDegrees && universityDegrees.find(degree => degree.id === option.value);

    formProps.setFieldValue("accreditedUniversityDegree", degree);
  }

  onFieldOfStudySet = (formProps) => () => {
    formProps.setFieldValue("fieldOfStudyOther", undefined);
  }

  onYearChange = (formProps) => (years) => {
    const { getUniversityDegrees } = this.props;
    const universityDegrees = getUniversityDegrees(formProps.values.accreditedUniversityId);
    const universityDegreesOptions = universityDegrees ? universityDegrees.filter(this.filterDegreesByYear(years.yearOfDegree)) : [];

    if (universityDegreesOptions.length < 1) {
      formProps.setFieldValue('accreditedUniversityDegreeId', undefined);
      formProps.setFieldValue("accreditedUniversityDegree", undefined);
    }
  }

  filterDegreesByYear = (yearOfDegree) => degree => {
    const degreeStartYear = new Date(degree.startDate).getFullYear();
    const degreeEndYear = new Date(degree.endDate).getFullYear();

    if (!yearOfDegree || !degree.endDate || !degree.startDate || yearOfDegree >= degreeStartYear && yearOfDegree <= degreeEndYear) { // eslint-disable-line no-mixed-operators
      return true;
    }
    return false;
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formProps) => {
    const {
      education,
      getUniversityDegrees,
      fields,
      settings,
      saving,
      className,
    } = this.props;

    const {
      isAccreditedUniversity,
      degreeEnum,
      schoolName,
      yearOfDegree,
      accreditedUniversityId,
    } = formProps.values;

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const formatEnum = item => ({ value: capitalize(item.name), label: item.displayName });
    const degreeLevelList = settings.academicEducationLevels && settings.academicEducationLevels.map(formatEnum);
    const fieldOfStudyList = settings.fieldOfStudy && settings.fieldOfStudy.map(formatEnum);
    const universityDegrees = getUniversityDegrees(accreditedUniversityId);
    const formatOptions = degree => ({ value: degree.id, label: degree.shortName, tooltip: degree.name });
    const universityDegreesOptions = universityDegrees ? universityDegrees.filter(this.filterDegreesByYear(yearOfDegree)).map(formatOptions) : [];
    const canSetDergeeProgram = this.isDergeeProgramAvailableLevel(degreeEnum) && isAccreditedUniversity;
    const canSetFieldOfStudy = this.isFieldOfStudyAvailableLevel(degreeEnum) && schoolName;
    const accreditedUniversityAvailable = this.isFieldOfStudyAvailableLevel(degreeEnum);
    let gacUniversityDescription;

    if (fields.GacUniversityDescription && schoolName) {
      let { value } = fields.GacUniversityDescription;
      value = value && value.replace(/\{universityName\}/g, schoolName);
      gacUniversityDescription = { value };
    }

    return (
      <Form className={classNames(className, "edit-mode")} onFocus={this.handleFocus}>
        <FormTracking
          formik={formProps}
          formName="academic education"
          formStartState={this.state.isFormStart}
        />
        <div className="form-row">
          <div className="col-lg-8">
            <SelectField
              fieldName="degreeEnum"
              options={degreeLevelList}
              placeholder={i18n.t("cert-app.Common.SelectPlaceholder")}
              onChange={this.onEducationLevelSet(formProps)}
              disabled={saving}
              required
              label={<Text field={fields.EditModeHighestLevelOfEducation} />}
            />
          </div>
          <div className="col-lg-4">
            <YearsPeriod
              nameFrom="yearStarted"
              nameTo="yearOfDegree"
              placeholder={i18n.t("cert-app.Common.YearInputPlaceholder")}
              min={new Date().getFullYear() - 100}
              max={new Date().getFullYear()}
              yearsSort="desc"
              onChange={this.onYearChange(formProps)}
              disabled={saving}
              required
              label={<Text field={fields.EditModeYearsAttended} />}
            />
          </div>
        </div>
        <CountrySelect
          fieldName="schoolCountryCode"
          onChange={this.onCountrySet(formProps)}
          required
          disabled={saving}
          loading={false}
          label={<Text field={fields.EditModeCountryOfInstitution} />}
        />
        {degreeEnum &&
          <InstitutionSelect
            autocompleteEnabled={accreditedUniversityAvailable}
            onUniversitySet={this.onUniversitySet(formProps)}
            fieldName="schoolName"
            required
            disabled={saving}
            label={<Text field={accreditedUniversityAvailable ? fields.EditModeNameOfInstitution : fields.EditModeNameOfSchool} />}
          />}
        {(canSetDergeeProgram && gacUniversityDescription) &&
          <RichText field={gacUniversityDescription} className="help-text" />}
        {canSetFieldOfStudy &&
          <GacField
            formProps={formProps}
            fields={fields}
            saving={saving}
            isAccreditedUniversity={canSetDergeeProgram}
            fieldOfStudyOptions={fieldOfStudyList}
            universityDegreesOptions={universityDegreesOptions}
            onDegreeProgramChange={this.onDegreeProgramSet(formProps)}
            onFieldOfStudyChange={this.onFieldOfStudySet(formProps)}
          />}
        <div className="d-flex align-items-end mt-4">
          {education ?
            <Button
              variant="outline-primary"
              className="mr-2"
              disabled={saving}
              onClick={this.cancelEditing}
              titleText={i18n.t('cert-app.Common.Cancel')}
            /> :
            null}
          <SaveButton
            className="btn"
            saving={saving}
            label={i18n.t('cert-app.Education.AcademicEducation.SaveAcademicEducation')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  };

  render() {
    const { education, countryOfRegistration } = this.props;
    const degreeEnum = education && education.degreeEnum;
    const degreeProgramAvailable = this.isDergeeProgramAvailableLevel(degreeEnum);

    const values = {
      ...education,
      specializationType: specializationTypes.FIELD_OF_STUDY,
    };

    if (!values.schoolCountryCode) {
      values.schoolCountryCode = countryOfRegistration;
    }

    if (values.accreditedUniversityDegreeId && degreeProgramAvailable) {
      values.specializationType = specializationTypes.DEGREE_PROGRAM;
    }

    if(values.accreditedUniversityDegreeId === null)
    {
      values.accreditedUniversityDegreeId = undefined;
    }
    if(values.accreditedUniversityDegree === null)
    {
      values.accreditedUniversityDegree = undefined;
    }
    if(values.fieldOfStudyEnum === null)
    {
      values.fieldOfStudyEnum = undefined;
    }
    if(values.fieldOfStudyOther === null)
    {
      values.fieldOfStudyOther = undefined;
    }
    return (
      <Formik
        initialValues={values}
        validateOnChange
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        enableReinitialize
      />
    )
  }
}

const mapStateToProps = state => ({
  saving: getIsSavingStatus(state),
  countryOfRegistration: getCountryOrigin(state),
  getUniversityDegrees: universityId => getAccreditedUniversityDegrees(universityId)(state),
});

const mapDispatchToProps = dispatch => ({
  setIsOpen: (isOpen) => dispatch(uiActions.setIsOpen(isOpen)),
  saveAcademicEducation: (data) => dispatch(apiActions.saveAcademicEducation(data)),
  fetchProfile: () => dispatch(profileActions.fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcademicEducationEdit);
