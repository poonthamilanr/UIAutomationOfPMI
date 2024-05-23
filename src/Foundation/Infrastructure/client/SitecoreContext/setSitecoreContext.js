import React, { useEffect } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

let globalSitecoreContext;
let updateGlobalSitecoreContext;

export const getSitecoreContext = () => globalSitecoreContext;
export const getUpdateSitecoreContext = () => updateGlobalSitecoreContext;
export const SitecoreContextGlobalValue = () => {
  const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });
  useEffect(() => {
    globalSitecoreContext = sitecoreContext;
    updateGlobalSitecoreContext = updateSitecoreContext;
  }, [sitecoreContext, updateSitecoreContext]);
  return React.createElement(React.Fragment, null);
};
