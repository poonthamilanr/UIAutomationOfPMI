import React from 'react';
import { LinkButton } from '@pmi/dsm-react-bs4';
import { connect } from 'formik';
import { trackGeneralPageLink } from 'foundation/Analytics/client/AdobeAnalytics/accessors'

class LinkTrackButton extends React.PureComponent {

  linkTrackingClick = () => {
    const { href, titleText, region } = this.props;
    const linkTracking = {
      linkTitle: titleText,
      linkModule: region,
      targetUrl: href,
    };
    trackGeneralPageLink({linkTracking});
  };

  render() {
    const { href, size, variant, titleText, disabled } = this.props;
    return (
      <LinkButton
        onClick={this.linkTrackingClick}
        href= {href}
        size= {size}
        variant={variant}
        titleText={titleText}
        disabled={disabled}
      />
    );
  }
}

export const LinkBtn = connect(LinkTrackButton);