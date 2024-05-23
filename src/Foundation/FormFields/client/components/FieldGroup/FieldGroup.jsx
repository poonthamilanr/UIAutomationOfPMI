import * as React from 'react';
import classNames from 'classnames';

export class FieldGroup extends React.PureComponent {
  render() {
    const { error, disabled, children, classNameGroup } = this.props;
    const formGroupClasses = classNames(
      'form-group',
      classNameGroup,
      {
        'form-group--disabled': disabled,
        'form-group--error': error,
      },
    );

    return (
      <div className={formGroupClasses}>
        {children}
      </div>
    );
  }
}
