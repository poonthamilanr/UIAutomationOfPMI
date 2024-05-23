import React from 'react';
import { Field } from 'formik';
import { AutoComplete } from '@pmi/dsm-react-bs4';
import i18n from 'i18next';
import { FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './select.scss';

export class SelectAutoCompleteField extends React.PureComponent {
  filterList(options, value) {
    return options.filter((option) => {
      return option.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  renderField = ({ field, form }) => {
    const { label, fieldName, required, disabled, classNameGroup, onChange, loading } = this.props;
    const sourceOptions = this.props.options && this.props.options.map(option => ({value: option, label: option})) || [];
    const id = getElementId('select', fieldName);
    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error, classNameGroup };
    const value = field.value || '';
    const hasValue = Boolean(value.trim());
    let options = hasValue ? this.filterList(sourceOptions, value) : sourceOptions;

    const change = (e) => {
      const univercityName = e.value.value;
      form.setFieldTouched(fieldName, true);
      form.setFieldValue(field.name, univercityName);

      if (onChange) {
        onChange(univercityName);
      }
    };

    const completeMethod = (e) => {
      options = this.filterList(sourceOptions, e.query);
      this.forceUpdate();
    }

    return (
      <FieldGroup {...groupProps}>
        {label && <FieldLabel id={id} label={label} required={required} />}
        {loading
          ? <p>{i18n.t('cert-app.Common.Loading')}</p>
          : <AutoComplete
            value={value}
            onChange={change}
            suggestions={options}
            completeMethod={completeMethod}
            maxlength={700}
            className="w-100"
            inputClassName={`${error ? 'is-invalid' : ''} form-control`}
            validationMessage={error}
            disabled={disabled}
            required={required}
          />}
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
