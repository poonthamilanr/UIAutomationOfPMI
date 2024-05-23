import React from 'react';

const data = { status: "Healthy", errors: [] };

const HealthCheck = () => (
  <div>{JSON.stringify(data, null, 2)}</div>
);

export default HealthCheck;