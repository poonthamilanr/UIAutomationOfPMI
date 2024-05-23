import React from 'react';
import i18n from 'i18next';
import { Field } from 'formik';
import { Button } from '@pmi/dsm-react-bs4';
import { FieldError, FieldGroup, FieldLabel } from "./FieldGroup";
import { getFieldError, getElementId } from "./utils";

export class YesNoButtons extends React.PureComponent {
  renderField = ({ field, form }) => {
    const { label, fieldName, index, required, disabled, onChange, children, classNameLabel } = this.props;
    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error };

    const click = (newValue) => () => {
      form.setFieldValue(field.name, newValue);
      if (onChange) {
        onChange(newValue);
      }
    }

    const id = getElementId('YesNoButtons', fieldName, index);
    const { value } = field;

    return (
      <FieldGroup {...groupProps}>
        {(label || children) && <FieldLabel id={id} label={label} required={required} className={classNameLabel}>
          {children}
        </FieldLabel>}
        <div className="d-flex">
          <Button
            variant={value === true ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={click(true)}
            titleText={i18n.t('cert-app.Common.Yes')}
          />
          <Button
            className="ml-2"
            variant={value === false ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={click(false)}
            titleText={i18n.t('cert-app.Common.No')}
          />
        </div>
        <FieldError error={error} fieldName={fieldName} index={index} />
      </FieldGroup>
    );
  };

  render() {
    return <Field name={this.props.fieldName} render={this.renderField} />;
  }
}
