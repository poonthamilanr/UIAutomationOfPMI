import React from 'react';
import Information from '../Information';

const InformationColumnView = ({ fields, rendering }) => (
  <Information fields={fields} isColumn={true} rendering={rendering}/>
);

export default InformationColumnView;