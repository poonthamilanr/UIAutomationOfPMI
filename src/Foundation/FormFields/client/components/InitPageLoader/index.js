import React from 'react';
import './styles.scss';

const InitPageLoader= () => {
  return (
    <div className="pmi-loader">
      <h2 className="pmi-loader__caption1">This Page is Loading</h2>
      <span className="pmi-loader__caption2">Please wait a moment while we load content.</span>
      <div className="pmi-loader__underBar">
        <div className="pmi-loader__bar" />
      </div>
    </div>
  );
};

export default InitPageLoader;
