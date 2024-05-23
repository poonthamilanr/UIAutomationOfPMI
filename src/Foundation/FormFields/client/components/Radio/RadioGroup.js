import React from 'react';
import i18n from 'i18next';
import { Field } from 'formik';
import { RadioButton } from '@pmi/dsm-react-bs4';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './radio.scss';

export class RadioGroup extends React.PureComponent {
  renderField = ({ field, form }) => {
    const { label, fieldName, index, options, required, disabled, onChange, onBlur, applyBoxStyle } = this.props;
    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error };

    const change = (e) => {
      form.setFieldValue(
        field.name,
        e.target.value? e.target.value : undefined,
      );
      field.onChange(e);
      if (onChange) {
        onChange(e.target.value);
      }
    };
    const blur = (e) => {
      form.setFieldTouched(fieldName, true);
      field.onBlur(e);
      if (onBlur) {
        onBlur(e);
      }
    };

    const id = getElementId('radio', fieldName, index);
    const { value, name } = field;

    return (
      <FieldGroup {...groupProps}>
        {label && <FieldLabel id={id} label={label} required={required} />}
        <div className="radio-form-field">
          {options.map((option, i) => {
            const id = getElementId('radio', fieldName, index ? `${index}_${i}` : i);
            return <span key={id} className={`radio-wrapper ${value === option.value && applyBoxStyle ? `p-radio-box-selected` : ``} ${applyBoxStyle ? `p-radio-box` : ``}`}>
              <RadioButton
                inputId={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onBlur={blur}
                onChange={change}
                ariaLabelledby={`${id}-label`}
              />
              <label className="radio-label" htmlFor={id}>{i18n.t(option.label)}</label>
            </span>
          })}
        </div>

        <FieldError error={error} fieldName={fieldName} index={index} />
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
