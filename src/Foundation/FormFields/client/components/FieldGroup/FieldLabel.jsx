import * as React from 'react';
import { LinkButton } from '@pmi/dsm-react-bs4';

export class FieldLabel extends React.PureComponent {
  render() {
    const { id, label, linkText, onClickLink, required, className, children } = this.props;
    return (
      <label htmlFor={id} id={`${id}-label`} className={`form-label ${className}`}>
        {label}
        {linkText && <>
          &nbsp;
          <LinkButton className="link-base" onClick={onClickLink} titleText={linkText}/>
        </>}
        {required && <>&nbsp;*</>}
        {children}
      </label>
    );
  }
}
