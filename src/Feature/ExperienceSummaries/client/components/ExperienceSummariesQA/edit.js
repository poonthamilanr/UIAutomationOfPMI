import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { SelectField, TextAreaField, RadioGroup, SaveButton } from 'foundation/FormFields/client/components';
import { getExperience } from 'foundation/Application/client/Experience/accessors';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import { getValidationSchema } from './validationSchema';

class ExperienceSummariesQAEdit extends React.Component {

  state = {
    isFormStart: false,
    isSaving: false,
  };

  handleCancelClick = () => {
    const { question, closeEditForm } = this.props;
    closeEditForm(question._links.self.href);
  }

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values) => {
    const { question, saveExperienceSummariesAnswer } = this.props;
    this.setState({ isSaving: true });
    const answer = {...values,  answerStatusEnum: 'Completed'};
    saveExperienceSummariesAnswer({...question, answer, onSuccess: this.onSaveSuccess});
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  onSaveSuccess = () => {
    this.setState({ isSaving: false });
  }

  renderForm = (formikProps) => {
    const { experiences, fields, question, sitecoreSettings } = this.props;
    const { isSaving } = this.state;
    const minWordCount =  sitecoreSettings ? sitecoreSettings.globalSettings.minimumWordsCount.value : 99;
    const maxWordCount =  sitecoreSettings ? sitecoreSettings.globalSettings.maximumWordsCount.value : 500;

    const answerOptions = [
      {value: 'A', label: question.optionA},
      {value: 'B', label: question.optionB},
    ];

    const worktype = fields && fields.Worktype.value;
    const isAvailableExperiance = experience => experience.workExperienceTypeEnum === worktype;
    const formatExperianceOption = experience => ({value: experience.id, label: experience.projectTitle});
    const experienceOptions = (experiences || []).filter(isAvailableExperiance).map(formatExperianceOption);

    return (
      <Form className='edit-mode experience-summaries' onFocus={this.handleFocus}>
        <FormTracking
          formik={formikProps}
          formName="Portfolio Risk Management"
          formStartState={this.state.isFormStart}
        />
        <h3 className='experience-summaries__title-edit'>{question.title}</h3>
        <div className='form-radio-inline-row'>
          <RadioGroup
            index={`qa${question.id}`}
            fieldName='option'
            options={answerOptions}
            applyBoxStyle={true}
          />
        </div>
        <SelectField
          fieldName='experienceId'
          label={fields && fields.EditModeExperienceReferenced.value}
          options={experienceOptions}
          placeholder={i18n.t('cert-app.Common.SelectPlaceholder')}
          required
        />
        <TextAreaField
          fieldName='answer'
          label={fields && fields.EditModeSummary.value}
          rows='8'
          required
          minWordCount={minWordCount}
          minWordMessage={fields && fields.AnswerMinWords.value}
          maxWordCount={maxWordCount}
          maxWordMessage={fields && fields.AnswerMaxWords.value}
        />
        <div className='d-flex align-items-end mt-4'>
          {question.answer &&
            <Button
              className="mr-2"
              disabled={isSaving}
              onClick={this.handleCancelClick}
              variant='outline-primary'
              titleText={i18n.t('cert-app.Common.Cancel')}
            />}
          <SaveButton
            className="btn"
            saving={isSaving}
            label={fields && fields.SaveSummary.value}
            onClick={this.handleSaveClick(formikProps)}
          />
        </div>
      </Form>
    )
  }

  render() {
    const { fields, question } = this.props;
    const initialValues = {...question.answer};

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(fields)}
        onSubmit={this.handleSubmit}
      >
        {this.renderForm}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  experiences: getExperience(state),
});

export default connect(mapStateToProps)(ExperienceSummariesQAEdit);