import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import * as apiActions from "foundation/Application/client/NameOnCertificate/actions";
import { InputField } from "foundation/FormFields/client/components";
import { SaveButton } from 'foundation/FormFields/client/components';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";

class NameOnCertificateEdit extends React.Component {
  state = {
    isFormStart: false,
  };

  validationSchema = Yup.object().shape({
    nameOnCertificate: Yup.string().nullable().max(100).required(this.props.fields.SpecifyNameOnCertificate.value),
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

  handleSubmit = ({ nameOnCertificate }) => {
    this.props.saveNameOnCertificate(nameOnCertificate);
  }

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
          formName="name on certificate exam details"
          formStartState={this.state.isFormStart}
        />
        <h2><Text field={fields.EditModeNameOnCertificateTitle} /></h2>
        <InputField
          fieldName="nameOnCertificate"
          maxLength={100}
          disabled={saving}
        >
          <div className="edit-mode__help-text">
            <RichText field={fields.EditModeNameOnCertificateTitleDescription} />
          </div>
        </InputField>
        <div className="d-flex align-items-end mt-4">
          <Button
            variant="outline-primary"
            disabled={saving}
            onClick={this.cancelEditing}
            titleText={i18n.t('cert-app.Common.Cancel')}
          />
          <SaveButton
            saving={saving}
            label={i18n.t('cert-app.ExamDetails.NameOnCertificate.SaveName')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  };

  render() {
    const { nameOnCertificate } = this.props;
    const initialValues = {
      nameOnCertificate,
    };

    return (
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        enableReinitialize={true}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setIsOpen: (isOpen) => dispatch(uiActions.setIsOpen(isOpen)),
  saveNameOnCertificate: (name) => dispatch(apiActions.saveNameOnCertificate(name)),
});

export default connect(null, mapDispatchToProps)(NameOnCertificateEdit);
