import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { isPageSimulation } from 'foundation/SitecoreUtils/client';

class Redirect extends React.Component {
  componentDidMount() {
    const { fields } = this.props;
    const redirectUrl = fields && fields.Link.value.url;

    if (redirectUrl && !isPageSimulation()) {
      window.location.href = redirectUrl;
    }
  }

  render() {
    const { fields } = this.props;

    if (!fields || isPageSimulation()) {
      return <div className="static-height">Page Redirect</div>;
    }

    return null;
  }
}

export default withSitecoreContext()(Redirect);