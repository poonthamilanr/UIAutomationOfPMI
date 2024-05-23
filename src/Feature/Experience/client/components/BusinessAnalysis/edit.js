import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import { InputField, MonthsPeriod, SelectField, SelectOrEnterField, TextAreaField, SaveButton } from 'foundation/FormFields/client/components';
import { getIsSavingStatus } from 'foundation/Application/client/Experience/accessors';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import { getBusinessAnalysisValidationSchema } from "foundation/Application/client/Experience/validationSchemas";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import '../Experience/experience.scss';

class BusinessAnalysisExperienceEdit extends React.Component {
  state = {
    isFormStart: false,
  };

  handleCancelClick = () => {
    this.props.openEditForm(null);
  }

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values) => {
    const { saveExperience } = this.props;
    saveExperience({
      workExperienceTypeEnum: "BusinessAnalysis",
      ...values,
    });
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formikProps) => {
    const { experience, fields, saving, sitecoreSettings, sitecoreListsSettings, isShowCancelButton } = this.props;
    const minWordCount =  sitecoreSettings ? sitecoreSettings.globalSettings.minimumWordsCount.value : 99;

    const formatOption = item => ({value: item.apiKey ? item.apiKey.value : '', label: item.displayName});
    const functionalAreaOptions = sitecoreListsSettings ? sitecoreListsSettings.FunctionalAreaTypes.map(formatOption) : [];
    const methodologyOptions = sitecoreListsSettings ? sitecoreListsSettings.Methodologies.map(formatOption) : [];
    const monthList = sitecoreListsSettings ? sitecoreListsSettings.Months.map(item => item.name) : [];
    const primaryFocusTypeOptions = sitecoreListsSettings ? sitecoreListsSettings.PrimaryFocusTypes.map(formatOption) : [];

    return (
      <Form className="edit-mode experience" onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="business analysis experience"
          formStartState={this.state.isFormStart}
        />
        <div className="w-100">
          <InputField
            fieldName='projectTitle'
            label={<Text field={fields.EditModeTitle}/>}
            required
          />
          <InputField
            fieldName='company'
            label={<Text field={fields.EditModeOrganization}/>}
            required
          />
          <InputField
            fieldName='jobTitle'
            label={<Text field={fields.EditModeJobTitle}/>}
            required
          />
        </div>
        <div className="form-row">
          <div className="col-md">
            <SelectOrEnterField
              enumFieldName='functionalAreaTypeEnum'
              otherFieldName='functionalAreaTypeOther'
              label={<Text field={fields.EditModeFunctionalReportingArea}/>}
              options={functionalAreaOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving}
              required
            />
          </div>
          <div className="col-md">
            <SelectOrEnterField
              enumFieldName='primaryFocusTypeEnum'
              otherFieldName='primaryFocusTypeOther'
              label={<Text field={fields.EditModeOrganizationPrimaryFocus}/>}
              options={primaryFocusTypeOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving}
              required
            />
          </div>
          <div className="col-xl">
            <SelectField
              fieldName='methodologyEnum'
              label={<Text field={fields.EditModeApproach}/>}
              options={methodologyOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving}
              required
            />
          </div>
        </div>
        <MonthsPeriod
          startDateField="startDate"
          endDateField="endDate"
          label={<Text field={fields.EditModeDates}/>}
          monthList={monthList}
          minDate={new Date(new Date().getFullYear() - 100, new Date().getMonth())}
          maxDate={new Date()}
          yearsSort="desc"
          inProgressAllowed
          disabled={saving}
          required
        />
        <TextAreaField
          fieldName='description'
          label={<Text field={fields.EditModeDescription}/>}
          rows="8"
          required
          minWordCount={minWordCount}
          minWordMessage={fields.DescriptionMinimumWordCountNotReached.value}
        >
          <div className="edit-mode__help-text mb-0">
            <RichText tag="p" field={fields.DescriptionHelpText}/>
          </div>
        </TextAreaField>
        <div className="d-flex align-items-end mt-4">
          {(experience || isShowCancelButton) &&
            <Button
              className="mr-2"
              disabled={saving}
              onClick={this.handleCancelClick}
              variant="outline-primary"
              titleText={i18n.t('cert-app.Common.Cancel')}
            />}
          <SaveButton
            className="btn"
            saving={saving}
            label={i18n.t('cert-app.Experience.ProjectExperience.SaveExperience')}
            onClick={this.handleSaveClick(formikProps)}
          />
        </div>
      </Form>
    )
  }

  render() {
    const { addForm, experience, fields } = this.props;
    const initialValues = {
      endDate: !addForm && null,
      ...experience,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validateOnChange
        validationSchema={getBusinessAnalysisValidationSchema(fields)}
      >
        {this.renderForm}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  saving: getIsSavingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  saveExperience: (data) => dispatch(apiActions.saveExperience(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessAnalysisExperienceEdit);
