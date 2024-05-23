import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { RadioButton } from '@pmi/dsm-react-bs4/dist';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import * as apiActions from "foundation/Profile/client/Phone/actions";
import { getProfileCountry } from 'foundation/Profile/client/Profile/accessors';
import { InputField, CountryCodeSelect, SaveButton } from "foundation/FormFields/client/components";
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import './phoneOption.scss';

class PhoneEdit extends React.Component {
  state = {
    phones: [],
    selectedPhoneIndex: undefined,
    isFormStart: false,
  }

  maxPhoneNumberLength = 15;

  minPhoneNumberLength = 4;

  validationSchema = Yup.object().shape({
    phoneCountryId: Yup.number()
      .required(this.props.fields.CountryCodeIsRequired.value),
    phoneNumber: Yup.string()
      .required(this.props.fields.EnterValueForPhoneNumber.value)
      .max(this.maxPhoneNumberLength, this.props.fields.PhoneNumber15Characters.value)
      .min(this.minPhoneNumberLength, this.props.fields.MinPhoneNumberCharacters.value)
      .when('phoneCountryData', (phoneCountryData, schema) =>{
        return this.props.fields.PhoneNumberValidation.some(validation => validation.fields.SelectionCode.value === phoneCountryData.code) ?
          schema.matches(new RegExp(this.props.fields.PhoneNumberValidation.find(validation => validation.fields.SelectionCode.value === phoneCountryData.code).fields.RegularExpression.value), this.props.fields.PhoneNumberValidation.find(validation => validation.fields.SelectionCode.value === phoneCountryData.code).fields.ErrorMessage.value):schema;
      })
      .when(['phoneCountryData','PhoneNumberType'],(phoneCountryData, PhoneNumberType, schema) => {
        return PhoneNumberType === 'Cell' && this.props.fields.MobileNumberValidation.some(validation => validation.fields.SelectionCode.value === phoneCountryData.code) ?
          schema.matches(new RegExp(this.props.fields.MobileNumberValidation.find(validation => validation.fields.SelectionCode.value === phoneCountryData.code).fields.RegularExpression.value), this.props.fields.MobileNumberValidation.find(validation => validation.fields.SelectionCode.value === phoneCountryData.code).fields.ErrorMessage.value):schema;
      }),
  });

  componentDidMount() {
    const phones = this.props.phones || [];
    const primaryIndex = phones.findIndex(phone => phone.isPrimary);
    const defaultIndex = phones.length > 0 ? phones.findIndex(phone => phone.phoneNumber) : undefined;

    this.setState({
      phones: phones.map(this.getInitialValues),
      selectedPhoneIndex: primaryIndex >= 0 ? primaryIndex : defaultIndex,
    });
  }

  handlePhoneSelect = formProps => (e) => {
    const newPhoneIndex = +e.target.value;
    const { phones, selectedPhoneIndex } = this.state;
    const replaceSelected = (phone, index) => index === selectedPhoneIndex ? formProps.values : phone;

    this.setState({
      phones: phones.map(replaceSelected),
      selectedPhoneIndex: newPhoneIndex,
    });
  }

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
    const { props } = this;
    const savePhone = values._links ? props.updatePhone : props.createPhone;
    const { phoneNumber, phoneCountryData } = values;
    delete values.phoneCountryData; // eslint-disable-line
    delete values.phoneCountryId; // eslint-disable-line
    savePhone(
      {
        onFailure: this.handleServerErrors,
        setErrors,
        data:{
          ...values,
          countryId: phoneCountryData.id,
          phoneCountryCode: phoneCountryData.code,
          phoneAreaCode: phoneNumber.substring(0, 3),
          phoneNumber: phoneNumber.substring(3),
        }});
  };

  handleServerErrors = (setErrors) => {
    const errors = {"phoneNumber":this.props.fields.DuplicatePhoneError.value};
    setErrors(errors);
  };

  sanitizePhoneNumber(value) {
    return ((value || '').match(/(\d+)/g) || []).join('');
  }

  getInitialValues = (phone) => {
    const { profileCountry } = this.props;
    let phoneCountryData;

    if (phone.countryId) {
      phoneCountryData = {
        id: phone.countryId,
        code: phone.phoneCountryCode,
      };
    }

    if (profileCountry && !phoneCountryData) {
      phoneCountryData = {
        id: profileCountry.id,
        code: profileCountry.internationalDialingCode,
      };
    }

    return {
      ...phone,
      phoneNumber: this.getInputPnoneNumber(phone),
      phoneCountryId: phoneCountryData && phoneCountryData.id,
      phoneCountryData,
    };
  }

  getInputPnoneNumber(phone) {
    return phone ? this.sanitizePhoneNumber(phone.phoneAreaCode) + this.sanitizePhoneNumber(phone.phoneNumber) : '';
  }

  getDispalyPhoneNumber(phone) {
    const countryCode = (phone && phone.phoneCountryData && phone.phoneCountryData.code) || '';
    const phoneNumber = (phone && phone.phoneNumber) || '';

    return countryCode && phoneNumber ? `+${countryCode} ${phoneNumber}` : '';
  }

  getDisplayPhoneType(phone) {
    const { fields } = this.props;
    const phoneType = phone && phone.PhoneNumberType;

    switch (phoneType) {
    case 'Cell': return fields.PhoneNumberTypeMobilePhone.value;
    case 'Home': return fields.PhoneNumberTypeHomePhone.value;
    case 'Work': return fields.PhoneNumberTypeWorkPhone.value;
    default : return phoneType ? `${phoneType} ${fields.PhoneNumberTypePhone.value}` : fields.PhoneNumberTypePhone.value;
    }
  }

  renderPhoneNumber = (phone) => {
    return (
      <span>{this.getDispalyPhoneNumber(phone)}</span>
    );
  }

  renderPhoneInput = (formProps) => (phone) => {
    const { saving, fields } = this.props;
    const hasExtension = ['Home', 'Work'].includes(phone.PhoneNumberType);
    const onCountryCodeChange = (data) => {
      formProps.setFieldValue(`phoneCountryData`, data);
    }

    return (
      <div className="row phone-input">
        <div className={`form-inline-group-base ${hasExtension ? 'col-md-8' :  'col-12'}`}>
          <CountryCodeSelect
            fieldName="phoneCountryId"
            onChange={onCountryCodeChange}
            required
            disabled={saving}
            classNameGroup="mb-0"
            label={<Text field={fields.EditModePhone} />}/>
          <InputField
            classNameGroup="mb-0 w-100"
            fieldName="phoneNumber"
            required
            maxLength={this.maxPhoneNumberLength}
            disabled={saving}
            onChange={val => formProps.setFieldValue('phoneNumber', this.sanitizePhoneNumber(val))}
          />
        </div>
        {hasExtension ?
          <InputField
            classNameGroup="mb-0 col-md-4"
            fieldName="phoneExtension"
            disabled={saving}
            maxLength={8}
            label={<Text field={fields.EditModeExtensionOptional} />}/> :
          null}
      </div>
    );
  }

  renderPhoneOption = (formProps) => (phone, phoneIndex) => {
    const { selectedPhoneIndex } = this.state;
    const isSelected = selectedPhoneIndex === phoneIndex;
    const renderContent = isSelected ? this.renderPhoneInput(formProps) : this.renderPhoneNumber;
    const radioButtonId = `phoneSelectRadioButton${phoneIndex}`;
    const phoneOptionClasses = classNames(
      'phone-option',
      { 'phone-option_selected': isSelected },
    );

    return (
      <div
        key={phoneIndex}
        className={phoneOptionClasses}
      >
        <div>
          <RadioButton
            inputId={radioButtonId}
            value={phoneIndex}
            checked={isSelected}
            onChange={this.handlePhoneSelect(formProps)}
            ariaLabelledby={`${radioButtonId}-label`}
          />
        </div>
        <div className="flex-grow-1">
          <label
            htmlFor={radioButtonId}
            className="phone-option__label"
          >
            {this.getDisplayPhoneType(phone)}
          </label>
          <div className="phone-option__content">
            {renderContent(phone)}
          </div>
        </div>
      </div>
    );
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = (formProps) => {
    const { saving, fields } = this.props;
    const { phones } = this.state;

    return (
      <Form className="edit-mode" onFocus={this.handleFocus}>
        <FormTracking
          formik={formProps}
          formName="phone exam details"
          formStartState={this.state.isFormStart}
        />
        <h2 className="mb-0"><Text field={fields.EditModeTitle} /></h2>
        <RichText field={fields.EditModeTitleDescription} className="help-text" />
        <div>
          {phones.map(this.renderPhoneOption(formProps))}
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
            label={i18n.t('cert-app.ExamDetails.Phone.SavePhone')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  };

  render() {
    const { phones, selectedPhoneIndex } = this.state;

    if (!phones.length) {
      return null;
    }

    return (
      <Formik
        initialValues={phones[selectedPhoneIndex]}
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
  profileCountry: getProfileCountry(state),
});

const mapDispatchToProps = dispatch => ({
  setIsOpen: (isOpen) => dispatch(uiActions.setIsOpen(isOpen)),
  createPhone: (data) => dispatch(apiActions.createPhone(data)),
  updatePhone: (data) => dispatch(apiActions.updatePhone(data)),
});

const phoneEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneEdit);

export default phoneEdit;
