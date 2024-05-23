import React from 'react';
import { Dropdown } from '@pmi/dsm-react-bs4';
import "./SelectControl.scss";

export class SelectControl extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props;

    return (
      <Dropdown
        className={`form-control ${className || ''}`}
        optionValue="value"
        optionLabel="label"
        {...rest}
      />
    );
  }
}
