import React from 'react';
import { connect } from 'formik';
import { RichText } from '@sitecore-jss/sitecore-jss-react';
import { AutoComplete } from '@pmi/dsm-react-bs4';
import { FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId } from '../utils';
import './agileMethodologySelect.scss';

class AgileMethodologySelectBase extends React.PureComponent {

  VALUE_SEPARATOR = ',';

  state = {
    value: [],
    options: [],
    filteredOptions: [],
    filterTouched: false,
  }

  componentDidMount() {
    this.updateStateValue();
  }

  componentDidUpdate() {
    this.updateStateValue();
  }

  updateStateValue() {
    const value = [...this.getFormikEnumValues(), ...this.getFormikOtherValues()];
    const isEqualValues = (a, b) => a.length === b.length && a.every((val => b.includes(val)));

    const byPrevOrder = prevValue => (a, b) => {
      const aInx = prevValue.indexOf(a);
      const bInx = prevValue.indexOf(b);
      return aInx >=0 && bInx >= 0 ? aInx - bInx : (bInx >= 0) - (aInx >= 0);
    }

    this.setState(state => ({
      options: this.props.options || state.options,
      filteredOptions: state.filterTouched ? state.filteredOptions : this.props.options || state.options,
      value: isEqualValues(state.value, value) ? state.value : value.sort(byPrevOrder(state.value)),
    }));
  }

  getFormikEnumValues() {
    const { formik, enumFieldName } = this.props;
    return this.parseOriginValue(formik.values[enumFieldName]);
  }

  getFormikOtherValues() {
    const { formik, otherFieldName } = this.props;
    return this.parseOriginValue(formik.values[otherFieldName]);
  }

  parseOriginValue(value) {
    return (typeof value === 'string' ? value : '')
      .split(this.VALUE_SEPARATOR).map(s => s.trim()).filter(s => s);
  }

  sanitizeInputValue(str) {
    return str.replace(this.VALUE_SEPARATOR, '').trim()
  }

  handleChange = (e) => {
    const items = e.target.value;
    const { options } = this.state;
    const { enumFieldName, otherFieldName, formik } = this.props;

    const ensureValue = arg => arg.value ? arg : {...arg, value: this.sanitizeInputValue(arg.label)};
    const compareValues = (a, b) => a.toLowerCase() === b.toLowerCase();
    const compareItem = ({value}) => arg => compareValues(arg.value, value) || compareValues(arg.label, value) ;
    const notRepeat = (item, inx, items) => !items.slice(0, inx).some(compareItem(item));
    const inOptions = val => options.some(opt => compareValues(opt.value, val));
    const extractValue = item => item.value;

    const values = items.map(ensureValue).filter(notRepeat).map(extractValue);
    const enumValue = values.filter(inOptions).join(',') || undefined;
    const otherValue = values.filter(val => !inOptions(val)).join(',') || undefined;

    if (formik.values[enumFieldName] !== enumValue) {
      formik.setFieldValue(enumFieldName, enumValue);
    }

    if (formik.values[otherFieldName] !== otherValue) {
      formik.setFieldValue(otherFieldName, otherValue);
    }
  }

  completeMethod = (e) => {
    this.setState(state => ({
      filteredOptions: state.options.filter((option) => {
        return option.label.toLowerCase().indexOf(e.query.toLowerCase()) > -1;
      }),
      filterTouched: true,
    }));
  }

  render() {
    const { enumFieldName, otherFieldName, label, required, disabled, classNameGroup, index, formik, helpText } = this.props;
    const error = getFieldError(formik, enumFieldName) || getFieldError(formik, otherFieldName);
    const id = getElementId('multi-select', enumFieldName, index);
    const { value, options, filteredOptions } = this.state;

    const extendedValue = value.map(value => {
      const option = options.find(opt => opt.value === value);
      return ({value, label: option ? option.label : value});
    });

    return (
      <FieldGroup
        classNameGroup={`multi-select-field ${classNameGroup || ''}`}
        required={required}
        disabled={disabled}
        error={error}
      >
        {label &&
            <FieldLabel id={id} label={label} required={required}/>}
        {helpText &&
            <RichText field={helpText} tag='p' className='label-help-text' />}
        <AutoComplete
          value={extendedValue}
          suggestions={filteredOptions}
          completeMethod={this.completeMethod}
          onChange={this.handleChange}
          // placeholder={placeholder}
          // scrollHeight={scrollHeight}
          multiple
          allowCustom
          // minLength={minLength}
          // delay={delay}
          // inputId={inputId}
          className={`${error ? 'is-invalid' : ''} w-100`}
          validationMessage={error}
          // inputClassName={inputClassName}
          // readonly={readonly}
          disabled={disabled}
          // maxlength={maxlength}
          // size={size}
          // autoFocus={autoFocus}
          // ariaLabelledBy={ariaLabelledBy}
        />
      </FieldGroup>
    );
  }
}

export const AgileMethodologySelect = connect(AgileMethodologySelectBase);