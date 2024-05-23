import React from 'react';
import { Field, connect } from 'formik';
import { SelectControl } from '../Select/SelectControl';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './MonthsPeriod.scss';

class YearsPeriodComponent extends React.PureComponent {

  getSequence = (min, max, sort) => {
    if (min && max && min < max) {
      let result = [];

      for (let i = min; i <= max; i++) {
        result.push(i);
      }

      if (typeof sort === 'function') {
        result = result.sort(sort);
      }
      else if (typeof sort === 'string' && sort.toLowerCase() === 'desc') {
        result = result.sort((a, b) => b - a);
      }

      return result;
    }

    return null;
  }

  renderField = ({ field, form }) => {
    const { placeholder, min, max, nameFrom, nameTo, onChange, disabled, yearsSort } = this.props;
    const options = this.getSequence(min, max, yearsSort);

    const handleChange = e => {
      const value = e.value;
      const newValues = {
        [nameFrom]: form.values[nameFrom],
        [nameTo]: form.values[nameTo],
      };

      form.setFieldValue(field.name, value);
      newValues[field.name] = value;

      if (field.name === nameFrom && value > form.values[nameTo]) {
        form.setFieldValue(nameTo, value);
        newValues[nameTo] = value;
      }

      if (field.name === nameTo && value < form.values[nameFrom]) {
        form.setFieldValue(nameFrom, value);
        newValues[nameFrom] = value;
      }

      if (onChange) {
        onChange(newValues);
        form.handleBlur(this);
      }
    }

    return (
      <SelectControl
        options={options.map(option => ({ value: option, label: option }))}
        value={field.value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
    );
  }

  render() {
    const { nameFrom, nameTo, label, required, disabled, index, formik } = this.props;
    const name = `${nameFrom}-${nameTo}`;
    const id = getElementId('period', name, index);
    const error = getFieldError(formik, nameFrom) || getFieldError(formik, nameTo);

    return (
      <FieldGroup
        required={required}
        disabled={disabled}
        error={error}
      >
        {label && <FieldLabel id={id} label={label} required={required}/>}
        <div className="dates-period">
          <Field name={nameFrom}>
            {this.renderField}
          </Field>
          <div className="dates-period__divider"/>
          <Field name={nameTo}>
            {this.renderField}
          </Field>
        </div>
        <FieldError error={error} fieldName={name} index={index} />
      </FieldGroup>
    );
  }
}

export const YearsPeriod = connect(YearsPeriodComponent);
