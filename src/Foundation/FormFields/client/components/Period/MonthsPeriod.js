import React from 'react';
import i18n from 'i18next';
import { connect } from 'formik';
import { Checkbox } from '@pmi/dsm-react-bs4';
import { SelectControl } from '../Select/SelectControl';
import { FieldError, FieldGroup, FieldLabel } from '../FieldGroup';
import { getFieldError, getElementId, getUniqueId } from '../utils';
import './MonthsPeriod.scss';

class MonthsPeriodComponent extends React.PureComponent {

  state = {
    startYear: undefined,
    startMonth: undefined,
    endYear: undefined,
    endMonth: undefined,
    monthOptions: [],
    yearOptions: [],
    initialized: false,
  };

  uid = getUniqueId();

  componentDidMount() {
    this.updateState();

    this.setState({
      yearOptions: this.getYearOptions(),
      monthOptions: this.getMonthOptions(),
      initialized: true,
    });
  }

  componentDidUpdate() {
    this.updateState();
  }

  updateState() {
    const { formik, startDateField, endDateField, inProgressAllowed } = this.props;
    const startDate = formik.values[startDateField];
    const endDate = formik.values[endDateField];

    const data = {
      inProgress: inProgressAllowed && endDate === null,
    };

    if (startDate) {
      data.startYear = this.extractYear(startDate);
      data.startMonth = this.extractMonth(startDate);
    }

    if (endDate) {
      data.endYear = this.extractYear(endDate);
      data.endMonth = this.extractMonth(endDate);
    }

    this.setState(data);
  }

  extractUtcDate(date) {
    const splitedDate = date.split('T')[0].split('-');

    return new Date(Date.UTC(splitedDate[0], parseInt(splitedDate[1], 10) - 1, splitedDate[2]));
  }

  extractYear(date) {
    return this.extractUtcDate(date).getUTCFullYear();
  }

  extractMonth(date) {
    return this.extractUtcDate(date).getUTCMonth();
  }

  makeStartDate(year, month) {
    const mm = (`0${month + 1}`).slice(-2);
    return `${year}-${mm}-01`;
  }

  makeEndDate(year, month) {
    const mm = (`0${month + 1}`).slice(-2);
    const dd = new Date(year, month + 1, 0).getDate();
    return `${year}-${mm}-${dd}`;
  }

  getYearsSequence = (min, max, sort) => {
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

  getYearOptions = () => {
    const { minDate, maxDate, yearsSort } = this.props;
    return this.getYearsSequence(new Date(minDate).getFullYear(), new Date(maxDate).getFullYear(), yearsSort);
  }

  getMonthOptions = () => {
    const { monthList } = this.props;
    return monthList.map((name, index) => ({value: index, label: name}));
  }

  inPeriodLimit = (year, month) => {
    const { minDate, maxDate } = this.props;
    return year && typeof month === 'number' &&
      new Date(year, month + 1, 0) >= new Date(minDate) &&
      new Date(year, month) <= new Date(maxDate);
  }

  correctMonth = (year, month) => {
    const minDate = new Date(this.props.minDate);
    const maxDate = new Date(this.props.maxDate);

    if (year ===  minDate.getFullYear() && month < minDate.getMonth()) {
      return minDate.getMonth();
    }

    if (year ===  maxDate.getFullYear() && month > maxDate.getMonth()) {
      return maxDate.getMonth();
    }

    return month;
  }

  handleStartYearChange = e => {
    // const selectedOption= e.target.value;
    // const startYear = selectedOption && selectedOption.value;
    const startYear = e.value;
    this.setState(state => {
      let { startMonth } = state;
      if (startMonth !== undefined) {
        startMonth = this.correctMonth(startYear, startMonth);
        const startDate = this.makeStartDate(startYear, startMonth);
        this.emitStartDateChange(startDate);
      }
      return {startYear};
    });
  }

  handleStartMonthChange = e => {
    let startMonth = e.value;
    this.setState(({startYear}) => {
      if (startYear !== undefined) {
        startMonth = this.correctMonth(startYear, startMonth);
        const startDate = this.makeStartDate(startYear, startMonth);
        this.emitStartDateChange(startDate);
      }
      return {startMonth};
    });
  }

  handleEndYearChange = e => {
    // const selectedOption= e.target.value;
    // const endYear = selectedOption && selectedOption.value;
    const endYear = e.value;
    this.setState(state => {
      let { endMonth } = state;
      if (endMonth !== undefined) {
        endMonth = this.correctMonth(endYear, endMonth);
        const endDate = this.makeEndDate(endYear, endMonth);
        this.emitEndDateChange(endDate);
      }
      return {endYear};
    });
  }

  handleEndMonthChange = e => {
    let endMonth = e.value;
    this.setState(({endYear}) => {
      if (endYear !== undefined) {
        endMonth = this.correctMonth(endYear, endMonth);
        const endDate = this.makeEndDate(endYear, endMonth);
        this.emitEndDateChange(endDate);
      }
      return {endMonth};
    });
  }

  handleInProgressChange = e => {
    const { checked } = e.target;
    const endDate = checked ? null : undefined;
    this.setState({endYear: undefined, endMonth: undefined});
    this.emitEndDateChange(endDate);
  }

  emitStartDateChange = (value) => {
    const { startDateField, formik } = this.props;
    formik.setFieldValue(startDateField, value);
  }

  emitEndDateChange = (value) => {
    const { endDateField, formik } = this.props;
    formik.setFieldValue(endDateField, value);
  }

  renderInProgress = () => {
    const { inProgress } = this.state;
    const { startDateField, endDateField, index, disabled } = this.props;
    const name = `${startDateField}-${endDateField}-in-progress`;
    const id = getElementId(`${this.uid}`, name, index);

    return (
      <div className="form-group d-flex justify-content-end">
        <div className="checkbox-form-field">
          <Checkbox
            name={name}
            inputId={id}
            checked={inProgress}
            onChange={this.handleInProgressChange}
            disabled={disabled}
            ariaLabelledby={`${id}-label`}
          />
          <FieldLabel
            id={id}
            label={i18n.t("cert-app.Common.InProgress")}
            className="checkbox-label"
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  render() {
    const { startDateField, endDateField, label, required, disabled, index, inProgressAllowed, formik } = this.props;
    const { startYear, startMonth, endYear, endMonth, yearOptions, monthOptions, inProgress, initialized } = this.state;
    const isStartMonthValid = ({value}) => !startYear || this.inPeriodLimit(startYear, value);
    const isEndMonthValid = ({value}) => !endYear || this.inPeriodLimit(endYear, value);
    // const getMonthOption = value => monthOptions.find(opt => opt.value === value) || null;
    const error = getFieldError(formik, startDateField) || getFieldError(formik, endDateField);
    const name = `${startDateField}-${endDateField}`;
    const id = getElementId('period', name, index);

    if (!initialized) {
      return null;
    }

    return (
      <div>
        <FieldGroup
          required={required}
          disabled={disabled}
          error={error}
        >
          {label && <FieldLabel id={id} label={label} required={required}/>}
          <div className="dates-period dates-period_months">
            <div className="input-group months-period__date-group">
              <SelectControl
                options={monthOptions.filter(isStartMonthValid)}
                value={startMonth}
                placeholder={i18n.t("cert-app.Common.MonthInputPlaceholder")}
                disabled={disabled}
                onChange={this.handleStartMonthChange}
              />
              <SelectControl
                options={yearOptions.map(option => ({ value: option, label: option }))}
                value={startYear}
                placeholder={i18n.t("cert-app.Common.YearInputPlaceholder")}
                disabled={disabled}
                onChange={this.handleStartYearChange}
              />
            </div>
            <div className="dates-period__divider"/>
            <div className="input-group months-period__date-group">
              <SelectControl
                options={monthOptions.filter(isEndMonthValid)}
                value={endMonth}
                placeholder={i18n.t("cert-app.Common.MonthInputPlaceholder")}
                disabled={disabled || inProgress}
                onChange={this.handleEndMonthChange}
              />
              <SelectControl
                options={yearOptions.map(option => ({ value: option, label: option }))}
                value={endYear}
                placeholder={i18n.t("cert-app.Common.YearInputPlaceholder")}
                disabled={disabled || inProgress}
                onChange={this.handleEndYearChange}
              />
            </div>
          </div>
          <FieldError error={error} fieldName={name} index={index} />
        </FieldGroup>
        {inProgressAllowed && this.renderInProgress(formik)}
      </div>
    );
  }
}

export const MonthsPeriod = connect(MonthsPeriodComponent);
