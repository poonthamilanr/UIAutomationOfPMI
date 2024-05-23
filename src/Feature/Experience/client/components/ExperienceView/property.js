import React from 'react';

const Property = ({label, value}) => {
  return (
    <div className="experience-property">
      <div className="experience-property__label">{label}</div>
      <div className="experience-property__value">{value}</div>
    </div>
  );
};

export default Property;