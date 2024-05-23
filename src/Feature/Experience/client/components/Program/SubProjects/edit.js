import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@pmi/dsm-react-bs4';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { InputField, MonthsPeriod, SelectField, SaveButton } from 'foundation/FormFields/client/components';
import { getIsSavingSubStatus } from 'foundation/Application/client/Experience/accessors';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as apiActions from 'foundation/Application/client/Experience/actions';
import * as uiActions from "./actions";
import '../../Experience/experience.scss';

class SubprojectEditBase extends React.PureComponent {
  state = {
    isFormStart: false,
  };

  getValidationSchema = (fields) => Yup.object().shape({
    projectTitle: Yup.string()
      .required(fields.TitleIsRequired.value)
      .max(80),
    methodologyEnum: Yup.string()
      .required(fields.ApproachIsRequired.value),
    teamSizeEnum: Yup.string()
      .required(fields.TeamSizeIsRequired.value),
    budgetRangeEnum: Yup.string()
      .required(fields.BudgetIsRequired.value),
    startDate: Yup.string()
      .required(fields.StartDateIsRequired.value),
    endDate: Yup.mixed()
      .test('is-required', fields.EndDateIsRequired.value, val => !!val || val === null)
      .test('is-bigger', fields.EndDateMustBeLaterThanTheStartDate.value, function (endDate) {
        const { startDate } = this.parent;
        return startDate && endDate ? new Date(startDate) <= new Date(endDate) : true;
      }),
  });

  handleCancelClick = () => {
    const { openEditForm, handleCloseForm } = this.props;
    openEditForm(null);
    if (handleCloseForm) {
      handleCloseForm();
    }
  }

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values) => {
    const { saveSubProject, handleCloseForm } = this.props;
    saveSubProject(values);
    if (handleCloseForm) {
      handleCloseForm();
    }
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formikProps) => {
    const { index, disableCancel, saving, editable, sitecoreListsSettings} = this.props;
    const { fields } = this.props.fields.ProjectSubForm;
    const formatOption = item => ({value: item.apiKey ? item.apiKey.value : '', label: item.displayName});
    const budgetRangeOptions = sitecoreListsSettings ? sitecoreListsSettings.BudgetRanges.map(formatOption) : [];
    const methodologyOptions = sitecoreListsSettings ? sitecoreListsSettings.Methodologies.map(formatOption) : [];
    const teamSizeOptions = sitecoreListsSettings ? sitecoreListsSettings.TeamSizes.map(formatOption) : [];
    const monthList = sitecoreListsSettings ? sitecoreListsSettings.Months.map(item => item.name) : [];

    return (
      <Form className="experience-program__projects-form" onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="program project sub form"
          formStartState={this.state.isFormStart}
        />
        <h4 className="experience-program__projects-title"><Text field={fields.EditModeProject} /> {index + 1}</h4>

        <div className="w-100">
          <InputField
            fieldName='projectTitle'
            label={fields.EditModeTitle.value}
            disabled={saving || !editable}
            required
          />
        </div>
        <div className="form-row">
          <div className="col-xl">
            <SelectField
              fieldName='methodologyEnum'
              label={fields.EditModeApproach.value}
              options={methodologyOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving || !editable}
              required
            />
          </div>
          <div className='col-md'>
            <SelectField
              fieldName='teamSizeEnum'
              label={fields.EditModeTeamSize.value}
              options={teamSizeOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              disabled={saving || !editable}
              required
            />
          </div>
          <div className='col-md'>
            <SelectField
              fieldName='budgetRangeEnum'
              label={fields.EditModeBudget.value}
              options={budgetRangeOptions}
              placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
              inputGroupText="USD"
              disabled={saving || !editable}
              required
            />
          </div>
        </div>
        <MonthsPeriod
          startDateField="startDate"
          endDateField="endDate"
          label={fields.EditModeDates.value}
          monthList={monthList}
          minDate={new Date(new Date().getFullYear() - 100, new Date().getMonth())}
          maxDate={new Date()}
          yearsSort="desc"
          inProgressAllowed
          disabled={saving || !editable}
          required
        />
        {editable &&
          <div className="d-flex align-items-end mt-4">
            {!disableCancel &&
              <Button
                onClick={this.handleCancelClick}
                variant="outline-primary"
                disabled={saving || !editable}
                titleText={i18n.t('cert-app.Common.Cancel')}
              />}
            <SaveButton
              className={!disableCancel ? "ml-2" : ""}
              saving={saving}
              label={i18n.t('cert-app.Experience.ProgramExperience.SaveProject')}
              onClick={this.handleSaveClick(formikProps)}
            />
          </div>}
      </Form>
    );
  }

  render() {
    const { project, fields } = this.props;
    const initialValues = {
      endDate: !!project.projectTitle && null,
      ...project,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validateOnChange
        validationSchema={this.getValidationSchema(fields)}
      >
        {this.renderForm}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  saving: getIsSavingSubStatus(state),
});

const mapDispatchToProps = dispatch => ({
  openEditForm: ref => dispatch(uiActions.setOpenRef(ref)),
  saveSubProject: (data) => dispatch(apiActions.saveSubProject(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubprojectEditBase);