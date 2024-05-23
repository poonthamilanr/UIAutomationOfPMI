import React from 'react';
import { Field } from 'formik';
import { Checkbox } from '@pmi/dsm-react-bs4';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './checkbox.scss';

export class CheckboxField extends React.PureComponent {
  renderField = ({ field, form }) => {
    const { label, linkText, onClickLink, fieldName, index, required, disabled, onChange, classNameGroup } = this.props;
    const { value, name } = field;
    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error, classNameGroup };

    const change = e => {
      field.onChange(e);
      if (onChange) {
        onChange({...form.values, [field.name]: e.target.checked });
      }
    };

    const id = getElementId('checkbox', fieldName, index);

    return (
      <FieldGroup {...groupProps}>
        <div className="checkbox-form-field">
          <Checkbox
            name={name}
            inputId={id}
            value={value}
            checked={value}
            onChange={change}
            ariaLabelledby={`${id}-label`}
          />
          {label &&
              <FieldLabel
                id={id}
                label={label}
                linkText={linkText}
                onClickLink={onClickLink}
                required={required}
                className="checkbox-label"
              />}
        </div>
        <FieldError error={error} fieldName={fieldName} index={index} />
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
