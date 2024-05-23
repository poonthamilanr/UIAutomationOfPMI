import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import { InputField, MonthsPeriod, SelectField, SelectOrEnterField, TextAreaField } from 'foundation/FormFields/client/components';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import { getProgramValidationSchema } from "foundation/Application/client/Experience/validationSchemas";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import '../Experience/experience.scss';

class ProgramExperienceEdit extends React.Component {
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
      workExperienceTypeEnum: "Program",
      ...values,
    });
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formikProps) => {
    const { experience, fields, saving, sitecoreListsSettings, isShowCancelButton, sitecoreSettings } = this.props;
    let minWordCount = sitecoreSettings ? sitecoreSettings.globalSettings.minimumWordsCount.value : 99;
    let showMaxCount = false;
    const formatOption = item => ({ value: item.apiKey ? item.apiKey.value : '', label: item.displayName });
    const budgetRangeOptions = sitecoreListsSettings ? sitecoreListsSettings.BudgetRanges.map(formatOption) : [];
    const functionalAreaOptions = sitecoreListsSettings ? sitecoreListsSettings.FunctionalAreaTypes.map(formatOption) : [];
    const monthList = sitecoreListsSettings ? sitecoreListsSettings.Months.map(item => item.name) : [];
    const primaryFocusTypeOptions = sitecoreListsSettings ? sitecoreListsSettings.PrimaryFocusTypes.map(formatOption) : [];
    const saveButtonLabel = experience ? i18n.t('cert-app.Experience.ProgramExperience.SaveChanges') : i18n.t('cert-app.Experience.ProgramExperience.AddProjects');

    if(fields.DescriptionMinWordCount.value !=='')
    {
      minWordCount = fields.DescriptionMinWordCount.value;
    }
    if(fields.DescriptionMaxWordCount.value !== '')
    {
      showMaxCount = true;
    }

    return (
      <Form className="edit-mode experience" onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="program experience"
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
          <div className='col-md'>
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
        </div>
        <div className="form-row">
          <div className="col-xl">
            <SelectField
              fieldName='budgetRangeEnum'
              label={<Text field={fields.EditModeBudget}/>}
              options={budgetRangeOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving}
              inputGroupText="USD"
              required
            />
          </div>
          <div className="col-md">
            <InputField
              fieldName='directReports'
              label={<Text field={fields.EditModeNumberOfDirectReports}/>}
              inputType="number"
              min={0}
              required
            />
          </div>
          <div className="col-md">
            <InputField
              fieldName='pmReports'
              label={<Text field={fields.EditModeDirectPMReports}/>}
              inputType="number"
              min={0}
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
          maxWordCount={showMaxCount ? fields.DescriptionMaxWordCount.value : undefined}
          maxWordMessage={fields.DescriptionMaximumWordCountReached.value}
          showMaxCount={showMaxCount}
        >
          <div className="edit-mode__help-text mb-0">
            <RichText tag="p" field={fields.DescriptionHelpText} />
          </div>
        </TextAreaField>
        <div className="edit-mode__help-text mb-0">
          <RichText tag="p" field={fields.DescriptionHelpSubText}/>
        </div>
        <div className="d-flex align-items-end mt-4">
          {(experience || isShowCancelButton) &&
            <Button
              className="mr-2"
              disabled={saving}
              onClick={this.handleCancelClick}
              variant="outline-primary"
              titleText={i18n.t('cert-app.Common.Cancel')}
            />}
          <Button
            className="btn"
            disabled={saving}
            onClick={this.handleSaveClick(formikProps)}
            variant="primary"
            titleText={saving ? i18n.t('cert-app.Common.Saving') : saveButtonLabel}
          />
        </div>
      </Form>
    )
  }

  render() {
    const { experience, fields, addForm } = this.props;
    const initialValues = {
      endDate: !addForm && null,
      ...experience,
    };

    return (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validateOnChange
          validationSchema={getProgramValidationSchema(fields)}
        >
          {this.renderForm}
        </Formik>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  saveExperience: (data) => dispatch(apiActions.bufferExperience(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProgramExperienceEdit);
