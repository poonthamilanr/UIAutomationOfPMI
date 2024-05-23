import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import * as apiActions from "foundation/Application/client/Name/actions";
import { InputField } from "foundation/FormFields/client/components";
import { FieldGroup, SaveButton } from 'foundation/FormFields/client/components';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import IdentificationFormsTooltip from './identificationTooltip';

class NameEdit extends React.Component {
  state = {
    isFormStart: false,
  };

  validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().max(20),
    lastName: Yup.string().nullable()
      .max(30)
      .when('firstName', {
        is: (value) => !value || value.length === 0,
        then: Yup.string().required(this.props.fields.SpecifyFirstLastName.value),
      }),
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

  handleSubmit = ({ ...values }) => {
    this.props.saveNameOnIdentification(values);
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
          formName="name exam details"
          formStartState={this.state.isFormStart}
        />
        <h2><Text field={fields.ViewModeNameOnIdentificationTitle} /></h2>
        <FieldGroup>
          <div className="edit-mode__input-group">
            <InputField
              fieldName="lastName"
              disabled={saving}
              maxLength={30}
              label={<Text field={fields.EditModeLastName} />}
            />
          </div>
          <div className="edit-mode__input-group">
            <InputField
              fieldName="firstName"
              disabled={saving}
              maxLength={20}
              label={<Text field={fields.EditModeFirstName} />}
            />
          </div>
          <div className="edit-mode__input-group">
            <InputField
              fieldName="middleName"
              disabled={saving}
              maxLength={20}
              label={<Text field={fields.EditModeMiddleName} />}
            />
          </div>
        </FieldGroup>
        <div>
          <h4>
            <Text field={fields.EditModeAcceptedFormsOfIdentificationTitle} />
            {' '}
            <IdentificationFormsTooltip fields={fields} />
          </h4>
          <div>
            <RichText field={fields.EditModeAcceptedFormsOfIdentificationDescription} />
          </div>
        </div>
        <div className="d-flex align-items-end mt-4">
          <Button
            variant="outline-primary"
            disabled={saving}
            onClick={this.cancelEditing}
            titleText={i18n.t('cert-app.Common.Cancel')}
          />
          <SaveButton
            saving={saving}
            label={i18n.t('cert-app.ExamDetails.Name.SaveName')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  };

  render() {
    const { nameOnIdentification } = this.props;
    const initialValues = {
      ...nameOnIdentification,
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
  saveNameOnIdentification: (data) => dispatch(apiActions.saveNameOnIdentification(data)),
});

export default connect(null, mapDispatchToProps)(NameEdit);
