import React from 'react';
import { connect } from 'formik';
import classNames from 'classnames';
import i18n from 'i18next';
import { SelectControl } from './SelectControl';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './SelectOrEnterField.scss';

class SelectOrEnterFieldComponent extends React.PureComponent {

  ENUM_OTHER = 'Other';

  INPUT_LENGTH = 255;

  state = {
    enumValueDefault: undefined,
    otherPicked: false,
    otherInFocus: false,
  };

  componentDidMount() {
    this.updateEnumValueDefault();
  }

  componentDidUpdate() {
    this.updateEnumValueDefault();

    if (this.state.otherPicked && this.otherInput) {
      this.setState({otherPicked: false});
      this.otherInput.focus();
    }
  }

  updateEnumValueDefault() {
    const enumValue = this.getFormikEnumValue();
    const enumValueDefault = !this.isEnumOther(enumValue) ? enumValue : undefined;

    this.setState(state => ({
      enumValueDefault: enumValueDefault || state.enumValueDefault,
    }));
  }

  isEnumOther(value) {
    return value === this.ENUM_OTHER;
  }

  getFormikEnumValue() {
    const { formik, enumFieldName } = this.props;
    return formik.values[enumFieldName];
  }

  getFormikOtherValue() {
    const { formik, otherFieldName } = this.props;
    return formik.values[otherFieldName];
  }

  emitChange = (enumValue, otherValue) => {
    const { formik, enumFieldName, otherFieldName } = this.props;
    formik.setFieldValue(enumFieldName, enumValue);
    formik.setFieldValue(otherFieldName, otherValue);
  }

  handleEnumChange = (e) => {
    const enumValue = e.value;
    this.emitChange(enumValue);

    if (this.isEnumOther(enumValue)) {
      this.setState({otherPicked: true});
    }
  }

  handleOtherChange = (e) => {
    const otherChange = e.target.value;

    if (otherChange.length <= this.INPUT_LENGTH) {
      this.emitChange(this.ENUM_OTHER, otherChange);
    }
  }

  handleCancelClick = () => {
    const { enumValueDefault } = this.state;
    this.emitChange(enumValueDefault);
  }

  handleInputFocus = () => {
    this.setState({otherInFocus: true});
  }

  handleInputBlur = () => {
    this.setState({otherInFocus: false})
  }

  renderSelectField = () => {
    const { options, placeholder } = this.props;
    const enumValue = this.getFormikEnumValue();

    return (
      <SelectControl
        options={options}
        value={enumValue}
        onChange={this.handleEnumChange}
        placeholder={placeholder}
      />
    );
  }

  renderOtherField = () => {
    const { otherInFocus } = this.state;
    const value = this.getFormikOtherValue() || '';
    const inputGroupClasses = classNames(
      'input-group',
      { 'input-group_in-focus': otherInFocus },
    );

    return (
      <div className={inputGroupClasses}>
        <div className="input-group-prepend">
          <span className="input-group-text">
            {i18n.t("cert-app.Common.Other")}
          </span>
        </div>
        <div className="form-control k-widget k-header ">
          <input
            className="k-input_"
            value={value}
            onChange={this.handleOtherChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            ref={elem => this.otherInput = elem} // eslint-disable-line
          />
          <div
            className="select-or-enter-field__cancel"
            onClick={this.handleCancelClick}
          >
            <span className="pi pi-times p-clickable" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { enumFieldName, otherFieldName, label, required, disabled, classNameGroup, index, formik } = this.props;
    const error = getFieldError(formik, enumFieldName) || getFieldError(formik, otherFieldName);
    const id = getElementId('select', enumFieldName, index);
    const enumValue = this.getFormikEnumValue();

    return (
      <FieldGroup
        classNameGroup={`select-or-enter-field ${classNameGroup || ''}`}
        required={required}
        disabled={disabled}
        error={error}
      >
        {label && <FieldLabel id={id} label={label} required={required}/>}
        {this.isEnumOther(enumValue) ? this.renderOtherField() : this.renderSelectField()}
        <FieldError error={error} fieldName={enumFieldName} index={index} />
      </FieldGroup>
    );
  }
}

export const SelectOrEnterField = connect(SelectOrEnterFieldComponent);
