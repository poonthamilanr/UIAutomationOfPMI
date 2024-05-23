import React from 'react';
import { connect } from 'react-redux';
import { getPaymentInfo } from 'foundation/Application/client/PaymentInfo/accessors';
import * as paymentInfoActions from "foundation/Application/client/PaymentInfo/actions";
import * as loaderActions from "foundation/FormFields/client/components/PageLoader/actions";
import { LinkButton } from '@pmi/dsm-react-bs4';
import { getApplication } from "foundation/Application/client/Application/accessors";
import { trackGeneralPageLink, certDataClickTracking } from 'foundation/Analytics/client/AdobeAnalytics/accessors'
import './paynowButton.scss';

class PaynowButton extends React.PureComponent {

  componentDidMount() {
    const { paymentInfo, fetchPaymentInfoData, hideLoader } = this.props;
    hideLoader();
    if (!paymentInfo) {
      fetchPaymentInfoData();
    }
  }

  getPaynowLandingUrl(paymentInfo) {
    if(paymentInfo.sku && paymentInfo.sku !== '')
    {
      return `${paymentInfo.landingPageUrl}?sku=${paymentInfo.sku}`;
    }
    const url = `${paymentInfo.landingPageUrl}?personID=${paymentInfo.personId}&orderType=${paymentInfo.orderType}&applicationID=${paymentInfo.applicationId}&credential=${paymentInfo.credential}&examID=${paymentInfo.examId}&examType=${paymentInfo.examType}&retake=${paymentInfo.retake}&countryCode=${paymentInfo.countryCode}`;
    return url;
  }

  linkTrackingClick = (region,payNowUrl) => () => {
    const { applicationData, fields } = this.props;
    const linkTracking = {
      linkTitle: fields.ButtonLabel.value,
      linkModule: region,
      targetUrl: payNowUrl,
    };
    certDataClickTracking(applicationData,'submit-payment','application:click:add-to-cart');
    trackGeneralPageLink({linkTracking});
  };

  render() {
    const { paymentInfo, fields } = this.props;

    if (!fields) return <div className="static-height"/>;

    if(paymentInfo)
    {
      const payNowUrl = this.getPaynowLandingUrl(paymentInfo);
      const region = "paynow-link-btn"
      return (
        <div className="paynow-button" adoberegion={region}>
          <LinkButton
            href={payNowUrl}
            size='lg'
            variant='primary'
            titleText={fields.ButtonLabel.value}
            region={region}
            onClick={this.linkTrackingClick(region,payNowUrl)}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  applicationData: getApplication(state),
  paymentInfo: getPaymentInfo(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPaymentInfoData: () => dispatch(paymentInfoActions.fetchPaymentInfoRequest()),
  hideLoader: () => dispatch(loaderActions.hidePageLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaynowButton);
