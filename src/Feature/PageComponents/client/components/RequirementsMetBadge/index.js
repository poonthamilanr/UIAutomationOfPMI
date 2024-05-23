import React from "react";
import { Image, RichText } from '@sitecore-jss/sitecore-jss-react';
import './requirementsBadge.scss';

const RequirementsMetBadge = ({ fields }) => {
  if (!fields) return <div className="static-height"/>;

  return (
    <div className="edit-mode requirements-badge">
      {fields.Image && <Image className="mr-4" media={fields.Image} />}
      {fields.Description && <RichText field={fields.Description} />}
    </div>
  );
};

export default RequirementsMetBadge;
