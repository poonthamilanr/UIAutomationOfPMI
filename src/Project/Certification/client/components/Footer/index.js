import React from 'react';
import { compose } from 'redux';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import withGlobalSettings from 'foundation/SitecoreSettings/client/GlobalSettings';
import withNavigationsSettings from 'foundation/SitecoreSettings/client/NavigationsSettings';
import FooterContent from './Footer';

class FooterLayout extends React.PureComponent {
  render() {
    return (
      <FooterContent />
    );
  }
}

export default compose(
  withSitecoreContext(),
  withNavigationsSettings,
  withGlobalSettings,
)(FooterLayout);
