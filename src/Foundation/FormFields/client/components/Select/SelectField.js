import React from 'react';
import { Field } from 'formik';
import i18n from 'i18next';
import { SelectControl } from './SelectControl';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';

export class SelectField extends React.PureComponent {
  renderField = ({ field, form }) => {
    const { props } = this;
    const {
      classNameGroup,
      clearable,
      disabled,
      fieldName,
      inputGroupText,
      index,
      label,
      loading,
      onBlur,
      onChange,
      onClose,
      onFocus,
      onOpen,
      options,
      placeholder,
      required,
      children,
    } = this.props;

    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error, classNameGroup };

    const change = (e) => {
      const newValue = e.value; // e.target.value
      form.setFieldValue(field.name, newValue);
      const option = newValue && options.find(opt => opt.value === newValue);
      if (onChange) {
        onChange(option && option.data !== undefined ? option.data : option || newValue);
      }
    };
    const blur = (e) => {
      form.setFieldTouched(fieldName, true);
      if (onBlur) {
        onBlur(e);
      }
    };
    const open = (e) => {
      if (onOpen) {
        onOpen(e);
      }
    }
    const close = (e) => {
      if (onClose) {
        onClose(e);
      }
    }
    const focus = (e) => {
      if (onFocus) {
        onFocus(e);
      }
    }

    const id = getElementId('select', fieldName, index);

    return (
      <FieldGroup {...groupProps}>
        {(label || children) && <FieldLabel id={id} label={label} required={required}>
          {children}
        </FieldLabel>}
        <div className={inputGroupText ? 'input-group' : ''}>
          {loading ? (
            <p>{i18n.t('cert-app.Common.LoadingCountries')}</p>
          ) : (
            <>
              {inputGroupText &&
                <div className="input-group-prepend">
                  <span className="input-group-text">{inputGroupText}</span>
                </div>}
              {/* className={`form-control ${boolean('valid', false) ? 'is-valid' : ''} ${boolean('invalid', false) ? 'is-invalid' : ''} ${select('size', sizeOptions, sizeOptions.med)}`} */}
              <SelectControl
                options={clearable ? [{label: '', value: undefined}, ...options] : options}
                value={field.value}
                autoWidth={true}
                onOpen={open}
                onClose={close}
                onFocus={focus}
                onBlur={blur}
                onChange={change}
                selectedValueTemplate={props.selectedValueTemplate}
                itemTemplate={props.itemTemplate}
                placeholder={placeholder}
                ariaLabel={inputGroupText}
                disabled={disabled}
              />
            </>
          )}
        </div>
        <FieldError error={error} fieldName={fieldName} index={index} />
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
