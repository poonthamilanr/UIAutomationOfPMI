/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import i18n from 'i18next';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { SelectField } from "foundation/FormFields/client/components";
import HorizontalRadioField from './HorizontalRadioField';

export default class GacField extends React.Component {
  renderFieldOfSudy = () => {
    const { fieldOfStudyOptions, saving, formProps, onFieldOfStudyChange, fields } = this.props;

    if (formProps.values.specializationType !== "fieldOfStudy") {
      return <SelectField options={[]} disabled label={<Text field={fields.EditModeFieldOfStudy} />} />
    }

    return <SelectField
      fieldName="fieldOfStudyEnum"
      placeholder={i18n.t("cert-app.Common.SelectPlaceholder")}
      options={fieldOfStudyOptions}
      onChange={onFieldOfStudyChange}
      disabled={saving}
      label={<Text field={fields.EditModeFieldOfStudy} />}
      required
    />
  }

  renderDegreeProgram = () => {
    const { saving, universityDegreesOptions, formProps, fields, onDegreeProgramChange } = this.props;
    const hasDegreeOptions = universityDegreesOptions.length > 0;

    if (!hasDegreeOptions) {
      return (
        <>
          <label className="form-label"><Text field={fields.EditModeDegreeProgram} /></label>
          <div className="invalid-feedback d-block pt-3 pb-2"><Text field={fields.DegreeProgramsUnavailable} /></div>
        </>
      );
    }

    if (formProps.values.specializationType !== "degreeProgram") {
      return <SelectField options={[]} disabled label={<Text field={fields.EditModeDegreeProgram} />} />
    }

    return <SelectField
      fieldName="accreditedUniversityDegreeId"
      options={universityDegreesOptions}
      itemTemplate={this.degreeProgramitemTemplate}
      onChange={onDegreeProgramChange}
      disabled={saving}
      placeholder={i18n.t("cert-app.Common.SelectPlaceholder")}
      label={<Text field={fields.EditModeDegreeProgram} />}
      required
    />
  }

  degreeProgramitemTemplate = (option) => (
    option.tooltip
      ? <span title={option.tooltip}>{option.label}</span>
      : <span >{option.label}</span>
  );

  renderGACFields = () => {
    const { formProps, universityDegreesOptions } = this.props;
    const hasDegreeOptions = universityDegreesOptions.length > 0;

    return (
      <>
        <HorizontalRadioField
          formProps={formProps}
          value="degreeProgram"
          fieldName="specializationType"
          disabled={!hasDegreeOptions}
        >
          {this.renderDegreeProgram()}
        </HorizontalRadioField>
        <HorizontalRadioField
          formProps={formProps}
          value="fieldOfStudy"
          fieldName="specializationType"
        >
          {this.renderFieldOfSudy()}
        </HorizontalRadioField>
      </>
    );
  }

  render() {
    const { isAccreditedUniversity } = this.props;

    return isAccreditedUniversity ? this.renderGACFields() : this.renderFieldOfSudy();
  }
}