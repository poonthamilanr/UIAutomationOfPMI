import * as React from 'react';
import { getElementId } from '../utils';

export class FieldError extends React.PureComponent {
  render() {
    const { fieldName, index, error } = this.props;

    const id = getElementId('error', fieldName, index);

    if (error) {
      return (
        <div id={id} className="form-item__error-message">
          {error}
        </div>
      );
    }
    return null;
  }
}
