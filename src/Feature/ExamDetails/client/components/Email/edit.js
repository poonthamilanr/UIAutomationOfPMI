import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import * as apiActions from "foundation/Profile/client/Email/actions";
import { InputField, SaveButton } from "foundation/FormFields/client/components";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";

class EmailEdit extends React.Component {
  state = {
    isFormStart: false,
  };

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(this.props.fields.EnterValidEmail.value)
      .email(this.props.fields.EnterValidEmail.value)
      .max(100),
  });

  cancelEditing = (e) => {
    e.preventDefault();
    const { setIsOpen } = this.props;
    setIsOpen(false);
  }

  handleSaveClick = (formikProps) => (e) => {
    e.preventDefault();
    formikProps.submitForm();
  };

  handleSubmit = (values, { setErrors  }) => {
    const { email, updateEmail, createEmail } = this.props;
    const params = {
      onFailure: this.handleServerErrors,
      setErrors,
      address: values.email,
    };

    if (!email) {
      createEmail(params);
    } else {
      updateEmail(params);
    }
  }

  handleServerErrors = (setErrors) => {
    const errors = {"email":this.props.fields.DuplicateEmailError.value};
    setErrors(errors);
  };

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formProps) => {
    const { saving, fields } = this.props;

    return (
      <Form className="edit-mode" onFocus={this.handleFocus}>
        <FormTracking
          formik={formProps}
          formName="email exam details"
          formStartState={this.state.isFormStart}
        />
        <h2><Text field={fields.EditModeTitle} /></h2>
        <InputField
          classNameGroup="mb-0 w-100"
          fieldName="email"
          required
          disabled={saving}
          maxLength={100}
          label={<Text field={fields.EditModeEmail} />}/>
        <div className="d-flex align-items-end mt-4">
          <Button
            variant="outline-primary"
            disabled={saving}
            onClick={this.cancelEditing}
            titleText={i18n.t('cert-app.Common.Cancel')}
          />
          <SaveButton
            saving={saving}
            label={i18n.t('cert-app.ExamDetails.Email.SaveEmail')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  };

  render() {
    const { email } = this.props;
    const initialValues = { email };

    return (
      <Formik
        initialValues={initialValues}
        validateOnChange
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        enableReinitialize
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setIsOpen: (isOpen) => dispatch(uiActions.setIsOpen(isOpen)),
  updateEmail: (data) => dispatch(apiActions.updateEmail(data)),
  createEmail: (data) => dispatch(apiActions.createEmail(data)),
});

const emailEdit = connect(
  null,
  mapDispatchToProps,
)(EmailEdit);

export default emailEdit;
