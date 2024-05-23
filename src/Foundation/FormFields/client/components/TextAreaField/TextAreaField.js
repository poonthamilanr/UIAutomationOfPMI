import React from 'react';
import classNames from 'classnames';
import i18n from 'i18next';
import { Field } from 'formik';
import { TextArea } from '@pmi/dsm-react-bs4';
import { FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './textAreaField.scss';

export class TextAreaField extends React.PureComponent {
  getValue = (value) => {
    const { formatValue } = this.props;
    if (formatValue) {
      return formatValue(value);
    }
    return value == null ? '' : value;
  };

  countWords = (value) => {
    return (value.match(/\S+/g) || []).length;
  }

  validate = (value) => {
    const { minWordCount, minWordMessage, maxWordCount, maxWordMessage } = this.props;
    const wordCount = this.countWords(value);

    if (wordCount < minWordCount) {
      return minWordMessage && minWordMessage.replace('{wordCount}', minWordCount);
    }

    if (maxWordCount && wordCount > maxWordCount) {
      return maxWordMessage && maxWordMessage.replace('{wordCount}', maxWordCount);
    }

    return undefined;
  }

  renderField = ({ field, form }) => {
    const {
      children,
      classNameGroup,
      disabled,
      fieldName,
      index,
      label,
      onBlur,
      onChange,
      required,
      minWordCount,
      minWordMessage,
      maxWordCount,
      showMaxCount,
      wordMessage,
      ...textAreaProps
    } = this.props;
    const { value, name } = field    ;
    const textAreaValue = this.getValue(value);
    const wordCount = this.countWords(textAreaValue);
    const error = getFieldError(form, fieldName);
    const groupProps = { required, disabled, error, classNameGroup };
    const id = getElementId('textArea', fieldName, index);
    const isValid = !this.validate(textAreaValue);
    const countClasses = classNames(
      'mr-1',
      {
        'textarea-field__word-count__valid-count':  wordCount && isValid,
        'textarea-field__word-count__invalid-count': wordCount && !isValid,
      },
    );

    const change = (e) => {
      field.onChange(e);
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const blur = (e) => {
      field.onBlur(e);
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <FieldGroup {...groupProps}>
        <div className="textarea-field__row">
          {(label || children) && <FieldLabel id={id} label={label} required={required} className={showMaxCount ? 'textarea-field__label-width' :''}>
            {children}
          </FieldLabel>}
          <p className="textarea-field__word-count">
            <span className={countClasses}>
              {wordCount}
            </span>
            {showMaxCount ? `/ ${maxWordCount} ` : ''}
            {i18n.t("cert-app.Common.Words")}
          </p>
        </div>
        <TextArea
          id={id}
          name={name}
          className={`${error ? 'is-invalid' : ''} form-control`}
          value={textAreaValue}
          required={required}
          disabled={disabled}
          validationMessage={error}
          onChange={change}
          onBlur={blur}
          {...textAreaProps}
        />
      </FieldGroup>
    );
  };

  render() {
    return (
      <Field
        name={this.props.fieldName}
        validate={this.validate}
      >
        {this.renderField}
      </Field>
    );
  }
}
