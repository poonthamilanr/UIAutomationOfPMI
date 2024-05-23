import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import i18n from 'i18next';
import { Button } from '@pmi/dsm-react-bs4';
import { RadioButton } from '@pmi/dsm-react-bs4/dist';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import * as apiProfileActions from "foundation/Profile/client/Address/actions";
import * as apiAppActions from "foundation/Application/client/Address/actions";
import { getTypedProfileAddress } from 'foundation/Profile/client/Address/accessors';
import { getCountryOrigin } from 'foundation/Profile/client/Profile/accessors';
import { InputField, RadioGroup, CountrySelect, SaveButton, StateSelect } from "foundation/FormFields/client/components";
import { getCountriesInfo, getAllCountries, getFilteredCountries } from 'foundation/Profile/client/Metadata/countries';
import { Col, Row } from 'react-bootstrap';
import FormTracking from 'foundation/Analytics/client/components/AdobeAnalytics/formTracking';
import * as uiActions from "./actions";
import './addressOption.scss';

class AddressEdit extends React.Component {
  state = {
    addresses: [],
    inputAddressIndex: -1,
    hasSavedAddresses: false,
    initialized: false,
    // TODO Make it configurable througn sitecore
    allowedAddressesTypes: ['Home', 'Work'],
    defaultSelectedAddressType: 'Home',
    isFormStart: false,
  };

  validationSchema = Yup.object().shape({
    countryCode: Yup.string()
      .required(this.props.fields.CountryIsRequired.value)
      .nullable(),
    address1: Yup.string()
      .required(this.props.fields.AddressIsRequired.value)
      .max(100)
      .nullable(),
    city: Yup.string()
      .required(this.props.fields.CityDistrictIsRequired.value)
      .max(50)
      .nullable(),
    state: Yup.string()
      .required(this.props.fields.StateProvinceIsRequired.value)
      .max(50)
      .nullable(),
    postalCode: Yup.string()
      .required(this.props.fields.ZipPostalCodeIsRequired.value)
      .max(25)
      .nullable()
      .when('countryCode', (countryCode, schema) => {
        return this.props.fields.PostalValidation.some(validation => validation.fields.SelectionCode.value === countryCode) ?
          schema.matches(new RegExp(this.props.fields.PostalValidation.find(validation => validation.fields.SelectionCode.value === countryCode).fields.RegularExpression.value),this.props.fields.PostalValidation.find(validation => validation.fields.SelectionCode.value === countryCode).fields.ErrorMessage.value) : schema
      }),
  });

  componentDidMount() {
    const { examAddress } = this.props;
    const { allowedAddressesTypes, defaultSelectedAddressType } = this.state;
    const addresses = allowedAddressesTypes.map(this.formatInputAddress);
    const isExamAddress = addr => addr.examAddress;
    const isProfileAddress = addr => addr.profileAddress;
    const isDefaultAddress = addr => addr.addressTypeEnum === defaultSelectedAddressType;
    const savedAddressIndex = examAddress ? addresses.findIndex(isExamAddress) : addresses.findIndex(isProfileAddress);
    const inputAddressIndex = savedAddressIndex >= 0 ? savedAddressIndex : addresses.findIndex(isDefaultAddress);
    const hasSavedAddresses = savedAddressIndex >= 0;

    this.setState({
      addresses,
      inputAddressIndex,
      hasSavedAddresses,
      initialized: true,
    });
  }

  formatInputAddress = addressTypeEnum => {
    const { examAddress, getTypedProfileAddress, countryOrigin } = this.props;
    const profileAddress = getTypedProfileAddress(addressTypeEnum);

    const result = {
      addressTypeEnum,
      countryCode: countryOrigin,
    };

    if (profileAddress) {
      Object.assign(result, {
        ...profileAddress.address,
        profileAddress,
      });
    }

    if (examAddress && examAddress.AddressType === addressTypeEnum) {
      Object.assign(result, {
        ...examAddress,
        examAddress,
      });
    }

    return result;
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

  handleSubmit = (values) => {
    const { saveAppAddress, saveProfileAddress } = this.props;

    const commonProperties = {
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      countryCode: values.countryCode,
      AddressType: values.addressTypeEnum,
    }
    saveProfileAddress({
      values: {
        ...commonProperties,
        AddressLocationType: values.AddressLocationType,
      },
      profileAddress: values.profileAddress,
    });

    saveAppAddress({
      ...commonProperties,
      address3: values.address3,
    });
  }

  handleAddressSelect = (e) => {
    const inputAddressIndex = +e.target.value;
    this.setState({inputAddressIndex});
  }

  handleCountryChange = formProps => () => {
    formProps.setFieldValue('state', '');
  }

  renderAddressInput = (formProps) => () => {
    const { saving, fields } = this.props;
    const country = formProps.values.countryCode;

    return (
      <>
        <CountrySelect
          fieldName="countryCode"
          excludeEmbargoed
          clearable
          required
          disabled={saving}
          onChange={this.handleCountryChange(formProps)}
          label={<Text field={fields.EditModeCountry} />}/>
        <InputField
          fieldName="address1"
          required
          disabled={saving}
          maxLength={100}
          label={<Text field={fields.EditModeAddress}/>}/>
        <InputField
          fieldName="address2"
          disabled={saving}
          maxLength={100}
          label={<Text field={fields.EditModeAddressOptional} />}/>
        <InputField
          fieldName="city"
          required
          maxLength={50}
          disabled={saving}
          label={<Text field={fields.EditModeCityDistrict} />}/>
        <Row>
          <Col sm='7' xl='9'>
            <StateSelect
              fieldName="state"
              required
              disabled={saving}
              excludeEmbargoed
              maxLength={50}
              countryCode={country}
              label={<Text field={fields.EditModeStateProvince} />}/>
          </Col>
          <Col sm='5' xl='3'>
            <InputField
              fieldName="postalCode"
              required
              disabled={saving}
              maxLength={25}
              label={<Text field={fields.EditModeZipPostalCode} />}/>
          </Col>
        </Row>
      </>
    );
  }

  renderAddress = (address) => {
    const { address1, address2, city, state, postalCode, countryCode } = address;

    return (
      <div>
        {address1 && <>{address1}<br /></>}
        {address2 && <>{address2}<br /></>}
        {city && <>{city}, </>}
        {state && <>{state} </>}
        {postalCode && <>{postalCode}<br /></>}
        {address1 && <>{countryCode}</>}
      </div>
    )
  }

  getDisplayAddressType(address) {
    const { fields } = this.props;
    const addressType = address && address.addressTypeEnum;

    switch (addressType) {
    case 'Home': return fields.AddressTypeHomeAddress.value;
    case 'Work': return fields.AddressTypeWorkAddress.value;
    default: return addressType ? `${addressType} ${fields.AddressTypeAddress.value}` : fields.AddressTypeAddress.value;
    }
  }

  renderAddressOption = formProps => (address, addressIndex) => {
    const isAddressSelected = addressIndex === this.state.inputAddressIndex;
    const renderContent = isAddressSelected ? this.renderAddressInput(formProps) : this.renderAddress;
    const radioButtonId = `addressSelectRadioButton${addressIndex}`;

    return (
      <div
        key={addressIndex}
        className={`address-option ${isAddressSelected ? 'address-option_selected' : ''}`}
      >
        <RadioButton
          inputId={radioButtonId}
          value={addressIndex}
          checked={isAddressSelected}
          onChange={this.handleAddressSelect}
          ariaLabelledby={`${radioButtonId}-label`}
        />
        <label className="radio-label" htmlFor={radioButtonId}>
          {this.getDisplayAddressType(address)}
        </label>
        <div className='address-option__content'>
          {renderContent(address)}
        </div>
      </div>
    )
  }

  renderSingleAddress = formProps => {
    const { values } = formProps;
    const { allowedAddressesTypes } = this.state;
    const { fields } = this.props;

    const renderContent = this.renderAddressInput(formProps);
    const habdleAddresChange = value => formProps.setFieldValue('selectedAddressType', value);
    const formatOption = addrType => ({value: addrType, label: fields[`AddressType${addrType}Address`] && fields[`AddressType${addrType}Address`].value});
    const options = allowedAddressesTypes.map(formatOption);

    return (
      <div className="address-option">
        <RadioGroup
          fieldName="addressTypeEnum"
          options={options}
          onChange={habdleAddresChange}
        />
        <div className='address-option__content pl-0'>
          {renderContent(values)}
        </div>
      </div>
    );
  }

  handleFocus = () => {
    this.setState({
      isFormStart: true,
    });
  }

  renderForm = formProps => {
    const { saving, fields } = this.props;
    const { addresses, hasSavedAddresses } = this.state;

    return (
      <Form className="edit-mode" onFocus={this.handleFocus}>
        <FormTracking
          formik={formProps}
          formName="address exam details"
          formStartState={this.state.isFormStart}
        />
        <h2 className="mb-0"><Text field={fields.EditModeTitle} /></h2>
        <RichText field={fields.EditModeTitleDescription} className="help-text" />
        {hasSavedAddresses ? addresses.map(this.renderAddressOption(formProps)) : this.renderSingleAddress(formProps)}
        <div className="d-flex align-items-end mt-4">
          <Button
            variant="outline-primary"
            disabled={saving}
            onClick={this.cancelEditing}
            titleText={i18n.t('cert-app.Common.Cancel')}
          />
          <SaveButton
            saving={saving}
            label={i18n.t('cert-app.ExamDetails.Address.SaveAddress')}
            onClick={this.handleSaveClick(formProps)}
          />
        </div>
      </Form>
    );
  }

  render() {
    const { addresses, inputAddressIndex, initialized } = this.state;

    if (!initialized) {
      return null;
    }

    const inputAddress = addresses[inputAddressIndex];

    const initialValues = {
      ...inputAddress,
      selectedAddressType: inputAddress.addressTypeEnum,
    };

    return (
      <Formik
        initialValues={initialValues}
        validateOnChange
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        enableReinitialize
      >
        {this.renderForm}
      </Formik>
    )
  }
}

const mapStateToProps = state => ({
  countryOrigin: getCountryOrigin(state),
  getTypedProfileAddress: type => getTypedProfileAddress(type)(state),
  countriesData: getAllCountries(getCountriesInfo(state)) || getFilteredCountries(getCountriesInfo(state)),
})

const mapDispatchToProps = dispatch => ({
  setIsOpen: (isOpen) => dispatch(uiActions.setIsOpen(isOpen)),
  saveProfileAddress: data => dispatch(apiProfileActions.saveAddress(data)),
  saveAppAddress: data => dispatch(apiAppActions.saveAddress(data)),
});

const addressEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressEdit);

export default addressEdit;
