import React from 'react';
import { LinkBtn } from "foundation/FormFields/client/components/LinkTrackButton";
import './submitButton.scss';


const SubmitButton = ({ fields }) => {
  if (!fields) return <div className="static-height" />;
  const region = "landing-link-btn";
  return (
    <div id={region} className="submit-button" adoberegion={region}>
      <LinkBtn
        href={fields.Action.value.href}
        size='lg'
        variant='primary'
        titleText={fields.Action.value.text}
        region={region}
      />
    </div>
  );
};

export default SubmitButton;