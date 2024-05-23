import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import './heading.scss';

const Heading = ({ fields }) => {
  if (!fields) return <div className="static-height" />;

  return (
    <div className="heading">
      <Text tag="h2" field={fields.Title} />
      <RichText className="heading__description" field={fields.Description} />
    </div>
  );
};

export default Heading;