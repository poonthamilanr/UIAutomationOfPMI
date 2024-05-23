import React from 'react';
import { Field } from 'formik';
import { TextInput } from '@pmi/dsm-react-bs4';
import { FieldGroup, FieldLabel } from './FieldGroup';
import { getFieldError, getElementId } from './utils';

export class InputField extends React.PureComponent {
  getValue = (value) => {
    const { formatValue } = this.props;
    if (formatValue) {
      return formatValue(value);
    }
    return value == null ? '' : value;
  };

  renderField = ({ field, form }) => {
    const {
      label,
      fieldName,
      index,
      onChange,
      onBlur,
      inputType,
      required,
      disabled,
      classNameGroup,
      // isLoading,
      autoComplete,
      children,
      apiError,
      ...inputProps
    } = this.props;
    const { value, name } = field;
    const inputValue = this.getValue(value);
    const error = apiError || getFieldError(form, fieldName);
    const groupProps = { required, disabled, error, classNameGroup };

    const change = (e) => {
      field.onChange(e);
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const blur = async (e) => {
      const trimmed = e.target.value.trim();
      if (trimmed !== e.target.value) {
        e.target.value = trimmed;
        change(e);
      }

      await field.onBlur(e);
      if (onBlur) {
        onBlur(e);
      }
    };

    const id = getElementId('input', fieldName, index);

    return (
      <FieldGroup {...groupProps}>
        {(label || children) && <FieldLabel id={id} label={label} required={required}>
          {children}
        </FieldLabel>}
        <TextInput
          id={id}
          name={name}
          value={inputValue}
          className={`${error ? 'is-invalid' : ''} form-control`}
          type={inputType || 'text'}
          disabled={disabled}
          onChange={change}
          onBlur={blur}
          autoComplete={autoComplete ? 'on' : 'off'}
          validationMessage={error}
          {...inputProps}
        />
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
