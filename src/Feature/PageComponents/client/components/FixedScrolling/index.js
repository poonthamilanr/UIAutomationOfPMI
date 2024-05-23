import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import './fixedScrolling.scss';

const FixedScrolling = ({ rendering }) => (
  <div className="fixed-scrolling">
    <Placeholder name="cert-app-fixed-scrolling" rendering={rendering}/>
  </div>
);

export default FixedScrolling;