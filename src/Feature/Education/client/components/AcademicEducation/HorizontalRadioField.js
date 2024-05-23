import React from 'react';
import { RadioButton } from '@pmi/dsm-react-bs4/dist';
import "./horizontalRadioField.scss";

class HorizontalRadioField extends React.PureComponent {
  render() {
    const { value, fieldName, children, formProps, disabled } = this.props;
    const id = `radio_${fieldName}_${value}`;
    const change = (e) => {
      formProps.setFieldValue(
        fieldName,
        e.target.value? e.target.value : undefined,
      );
    };

    return (
      <div key={value} className="horizontal-radio">
        <RadioButton
          inputId={id}
          name={fieldName}
          value={value}
          checked={disabled ? false : formProps.values[fieldName] === value}
          disabled={disabled}
          onChange={change}
          ariaLabelledby={`${id}-label`}
        />
        <div className="horizontal-radio__content">{children}</div>
      </div>
    );
  }
}

export default HorizontalRadioField;