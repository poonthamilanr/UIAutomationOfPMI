import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { RichText } from '@sitecore-jss/sitecore-jss-react';
import { ReactComponent as CircleInfoIcon } from 'assets/icons/info.svg';
import './identificationTooltip.scss';

const IdentificationFormsTooltip = props => {
  const popover = (
    <Popover id="identificationFormsTooltip">
      <Popover.Content>
        {props.fields && <RichText field={props.fields.IdentificationModalBody} />}
      </Popover.Content>
    </Popover>

  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="right"
      overlay={popover}
    >
      <CircleInfoIcon className="svg-no-pointer-events" />
    </OverlayTrigger>
  );
};

export default IdentificationFormsTooltip;

