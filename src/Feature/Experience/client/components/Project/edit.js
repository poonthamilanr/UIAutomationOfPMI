import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import { InputField, MonthsPeriod, SelectField, SelectOrEnterField, TextAreaField, SaveButton } from 'foundation/FormFields/client/components';
import { getIsSavingStatus } from 'foundation/Application/client/Experience/accessors';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import { getWorkflowType } from 'foundation/Application/client/certtype-storage';
import { getProjectValidationSchema } from "foundation/Application/client/Experience/validationSchemas";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import '../Experience/experience.scss';

class ProjectExperienceEdit extends React.Component {

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
      workExperienceTypeEnum: "Project",
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
    const minWordCount = sitecoreSettings ? sitecoreSettings.globalSettings.minimumWordsCount.value : 99;

    const formatOption = item => ({ value: item.apiKey ? item.apiKey.value : '', label: item.displayName });
    const budgetRangeOptions = sitecoreListsSettings ? sitecoreListsSettings.BudgetRanges.map(formatOption) : [];
    const functionalAreaOptions = sitecoreListsSettings ? sitecoreListsSettings.FunctionalAreaTypes.map(formatOption) : [];
    const methodologyOptions = sitecoreListsSettings ? sitecoreListsSettings.Methodologies.map(formatOption) : [];
    const monthList = sitecoreListsSettings ? sitecoreListsSettings.Months.map(item => item.name) : [];
    const primaryFocusTypeOptions = sitecoreListsSettings ? sitecoreListsSettings.PrimaryFocusTypes.map(formatOption) : [];
    const teamSizeOptions = sitecoreListsSettings ? sitecoreListsSettings.TeamSizes.map(formatOption) : [];
    const workflowType = getWorkflowType();

    return (
      <Form className="edit-mode experience" onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="project experience"
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
        {(workflowType !== 'CPBEP') && (
          <div className="form-row">
            <div className="col-lg">
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
            <div className='col-lg'>
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
        )}
        {(workflowType !== 'PMI_SP' && workflowType !== 'PMI_RMP' && workflowType !== 'PfMP' && workflowType !== 'CPBEP') && (
          <div className="form-row">
            <div className="col-xl-4">
              <SelectField
                fieldName='methodologyEnum'
                label={<Text field={fields.EditModeApproach}/>}
                options={methodologyOptions}
                placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
                disabled={saving}
                required
              />
            </div>
            <div className='col-md-5 col-lg-6 col-xl-4'>
              <SelectField
                fieldName='teamSizeEnum'
                label={<Text field={fields.EditModeTeamSize}/>}
                options={teamSizeOptions}
                placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
                disabled={saving}
                required
              />
            </div>
            <div className='col-md-7 col-lg-6 col-xl-4'>
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
          </div>
        )}
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
        {workflowType !== 'PfMP' && (
          <TextAreaField
            fieldName='description'
            label={<Text field={fields.EditModeDescription}/>}
            rows="8"
            required
            minWordCount={minWordCount}
            minWordMessage={fields.DescriptionMinimumWordCountNotReached.value}
          >
            <div className="edit-mode__help-text mb-0">
              <RichText tag="p" field={fields.DescriptionHelpText} />
            </div>
          </TextAreaField>
        )}
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
    const { experience, fields, addForm } = this.props;
    const initialValues = {
      endDate: !addForm && null,
      ...experience,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validateOnChange
        validationSchema={getProjectValidationSchema(fields, getWorkflowType())}
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
)(ProjectExperienceEdit);
