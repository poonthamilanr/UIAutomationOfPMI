import React from 'react';
import { useSelector } from 'react-redux'
import { Overlay } from '@pmi/dsm-react-bs4';

const PageLoader = (props = {
  variant: "PMIOverlay",
  iconColor: "brand-dark",
  overlayColor: "black",
  overlayOpacity: 5,
  global: true,
}) => (
  <Overlay {...props} show={useSelector(state => state.pages.loading)} />
);
export default PageLoader;
